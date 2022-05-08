import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInfoService {
    constructor() {}

    public getUserInfo() {
        console.log("getter");
    }

    public setUserInfo() {
        console.log("setter");
    }
}
