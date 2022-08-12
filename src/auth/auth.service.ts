import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { PrismaService } from "../prisma/prisma.service";
import { AuthConfig } from "./auth.config";
import { AuthDto } from "./dto";
import { Tokens } from "./types";

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    private prisma: PrismaService,
    private authConfig: AuthConfig,
    // private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async registerUser(dto: AuthDto) {
    const { email, password } = dto;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [], null, (err, result) => {
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
          onSuccess: (res) => {
            resolve(res);
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
    });
  }

  async authenticateUser(dto: AuthDto) {
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
          resolve({
            access_token: result.getIdToken().getJwtToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async refreshTokens(refresh_token: string) {
  }

  public async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException("Credentials incorrect");

    const isValid = await argon.verify(user.password, dto.password);
    if (!isValid) throw new ForbiddenException("Credentials incorrect");

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  public async register(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    return {
      access_token: "",
      refresh_token: "",
    }
  //   const [at, rt] = await Promise.all([
  //     this.jwtService.signAsync(
  //       {
  //         userId,
  //         email,
  //       },
  //       {
  //         secret: this.configService.get<string>("AT_SECRET"),
  //         expiresIn: 60 * 60,
  //       }
  //     ),
  //     this.jwtService.signAsync(
  //       {
  //         userId,
  //         email,
  //       },
  //       {
  //         secret: this.configService.get<string>("RT_SECRET"),
  //         expiresIn: 60 * 60 * 24 * 7,
  //       }
  //     ),
  //   ]);
  //
  //   return {
  //     access_token: at,
  //     refresh_token: rt,
  //   };
  }
}
