import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthConfig } from "./auth.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/aws.strategy";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), ChatModule],
  providers: [AuthConfig, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
