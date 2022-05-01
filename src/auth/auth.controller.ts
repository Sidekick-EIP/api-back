import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post("login")
  login() {
    console.log("login");
  }

  @Post("register")
  register() {
    console.log("register")
  }
}
