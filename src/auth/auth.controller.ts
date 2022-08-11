import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
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
  async aws(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @Post("register")
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Get("me")
  me() {
    return "connected";
  }

  @Public()
  @Get("public")
  public() {
    return "public";
  }
}
