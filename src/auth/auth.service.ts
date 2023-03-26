import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import * as argon from "argon2";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoIdToken,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";
import { PrismaService } from "../prisma/prisma.service";
import { AuthConfig } from "./auth.config";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(private prisma: PrismaService, private authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async register(dto: AuthDto) {
    const { email, password } = dto;

    try {
      const result = await new Promise((resolve, reject) => {
        this.userPool.signUp(email, password, [], null, (err, _result) => {
          if (err) {
            reject(err);
          }
          const newUser = new CognitoUser({
            Username: email,
            Pool: this.userPool,
          });

          const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
          });

          return newUser.authenticateUser(authenticationDetails, {
            onSuccess: async (res) => {
              try {
                await this.createUser(dto);
              } catch (e) {
                reject(e);
              }
              resolve({
                access_token: res.getIdToken().getJwtToken(),
                refresh_token: res.getRefreshToken().getToken(),
              });
            },
            onFailure: (err) => {
              reject(err);
            },
          });
        });
      });

      return result;
    } catch (e) {
      console.log(e);
      throw new ForbiddenException("User already exists");
    }
  }

  async login(dto: AuthDto) {
    const { email, password } = dto;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    try {
      const result = await new Promise((resolve, reject) => {
        return newUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve({
              access_token: result.getIdToken().getJwtToken(),
              refresh_token: result.getRefreshToken().getToken(),
            });
          },
          onFailure: (err) => {
            reject(err);
          },

          newPasswordRequired: function (userAttributes, requiredAttributes) {
            newUser.completeNewPasswordChallenge(
              authenticationDetails.getPassword(),
              {},
              {
                onSuccess: (result) => {
                  resolve({
                    access_token: result.getIdToken().getJwtToken(),
                    refresh_token: result.getRefreshToken().getToken(),
                  });
                },
                onFailure(err: any): void {
                  reject(err);
                },
              }
            );
          },
        });
      });
      return result;
    } catch (e) {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async logout(email: string) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    user.globalSignOut({
      onSuccess: () => {},
      onFailure: (err) => {
        if (err.message !== "User is not authenticated") throw err;
      },
    });
  }

  async delete(dto: AuthDto) {
    const user = new CognitoUser({
      Username: dto.email,
      Pool: this.userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: dto.email,
      Password: dto.password,
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authenticationDetails, {
        onSuccess: (_res) => {
          user.deleteUser((err, result) => {
            try {
              this.deleteUser(dto.email);
            } catch (e) {}
            if (err) {
              reject(err);
            }
            try {
              this.deleteUser(dto.email);
            } catch (e) {
              console.log(e);
            }
            resolve(result);
          });
        },
        onFailure: (err) => {
          this.deleteUser(dto.email);
          reject(err);
        },
      });
    });
  }

  async refresh(rt: string, email: string) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    const refreshToken = new CognitoRefreshToken({ RefreshToken: rt });

    return new Promise((resolve, reject) => {
      user.refreshSession(refreshToken, (_, res) => {
        if (!res) {
          reject(new ForbiddenException());
        }
        resolve({
          access_token: res?.getIdToken()?.getJwtToken(),
          refresh_token: res?.getRefreshToken()?.getToken(),
        });
      });
    });
  }

  async forgotPassword(email: string) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      user.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          resolve(data);
        },
        onFailure: function (err) {
          reject(err);
        },
      });
    });
  }

  async resetPassword(dto: AuthDto, verificationCode: string) {
    const { email, password } = dto;

    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      user.confirmPassword(verificationCode, password, {
        onSuccess() {},
        onFailure(err) {
          reject(err);
        },
      });
    });
  }

  private async createUser(dto: AuthDto): Promise<void> {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password: hash,
        },
      })
      .catch((error) => {
        throw error;
      });

    if (!user)
      throw new InternalServerErrorException();

    await this.prisma.preferences.create({
      data: {
        userId: user.id,
      }
    })
  }

  private async deleteUser(email: string): Promise<void> {
    await this.prisma.user
      .delete({
        where: {
          email,
        },
      })
      .catch((error) => {
        /* throw error; */
      });
  }
}
