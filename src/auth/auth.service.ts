import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoIdToken
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

    return new Promise((resolve, reject) => {
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

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result);
          resolve({
            access_token: result.getIdToken().getJwtToken(),
            refresh_token: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
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
            } catch (e) {}
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

  private async createUser(dto: AuthDto): Promise<void> {
    const hash = await argon.hash(dto.password);

    await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password: hash,
        },
      })
      .catch((error) => {
        throw error;
      });
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
