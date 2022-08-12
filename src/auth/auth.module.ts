import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthConfig } from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AtStrategy } from "./strategies/at.strategy";
import { JwtStrategy } from "./strategies/aws.strategy";
import { RtStrategy } from "./strategies/rt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [AuthConfig, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
