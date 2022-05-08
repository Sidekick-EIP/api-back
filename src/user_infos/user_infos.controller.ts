import { Controller, Get, Post } from '@nestjs/common';

@Controller('user-infos')
export class UserInfosController {
    constructor() {}

    @Get("login")
    login() {
      console.log("login");
    }
  
    @Post("register")
    register() {
      console.log("register")
    }
}
