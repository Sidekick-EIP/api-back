import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  public login() {
    console.log("login");
  }

  public register() {
    console.log("register");
  }
}
