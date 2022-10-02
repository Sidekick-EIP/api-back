import { Body, Controller, Get, Headers, Post, Request } from "@nestjs/common";
import { Public } from "../common/decorators";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  async aws(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post("register")
  async awsRegister(@Body() dto: AuthDto) {
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
