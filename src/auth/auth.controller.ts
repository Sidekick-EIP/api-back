import { Body, Controller, Get, Headers, Post, Request, UnauthorizedException } from "@nestjs/common";
import UserNotFoundException from "src/user_infos/exceptions/not-found.exception";
import { Public } from "../common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post("register")
  async register(@Body() dto: AuthDto) {
    try {
      return this.authService.register(dto);
    } catch (e) {
      throw e;
    }
  }

  @Public()
  @Post("logout")
  async logout(@Body() email: string) {
    return this.authService.logout(email);
  }

  @Public()
  @Post("delete")
  async delete(@Body() dto: AuthDto) {
    return this.authService.delete(dto);
  }

  @Public()
  @Post("refresh")
  async refresh(@Body("rt") rt: string, @Body("email") email: string) {
    try {
      return this.authService.refresh(rt, email);
    } catch (e) {
      throw e;
    }
  }

  @Get("me")
  me(@Request() req: any) {
    console.log(req.user);
    return "connected";
  }

  @Public()
  @Get("public")
  public() {
    return "public";
  }
}
