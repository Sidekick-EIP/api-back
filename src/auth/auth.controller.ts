import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

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
