import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { passportJwtSecret } from "jwks-rsa";
import { AuthConfig } from "../auth.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly authService: AuthService,
    private authConfig: AuthConfig
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),

      audience: authConfig.clientId,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: authConfig.authority,
      algorithms: ["RS256"],
    });
  }

  public async validate(payload: any) {
    return !!payload.sub;
  }
}
