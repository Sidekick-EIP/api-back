import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "../common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post("aws")
  async aws(@Body() dto: AuthDto) {
    return this.authService.authenticateUser(dto);
  }

  @Public()
  @Post("aws/register")
  async awsRegister(@Body() dto: AuthDto) {
    try {
      return this.authService.registerUser(dto);
    } catch (e) {
      throw e;
    }
  }

  @Public()
  @Post("aws/refresh")
  async refresh(@Body() tokens: { refreshToken: string, accessToken: string }) {
    try {
      return this.authService.refreshTokens("wip");
    } catch (e) {
      throw e;
    }
  }

  @Public()
  @Post("register")
  register(@Body() dto: AuthDto) {
    try {
      return this.authService.register(dto);
    } catch (e) {
      throw e;
    }
  }

  @Get("me")
  me() {
    return "connected";
  }


  @Public()
  @UseGuards(AuthGuard("jwt"))
  @Get("public")
  public() {
    return "public";
  }
}
