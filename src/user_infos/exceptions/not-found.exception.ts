import { NotFoundException } from "@nestjs/common";

class UserNotFoundException extends NotFoundException {
    constructor(postid: string) {
        super('User with id ' + postid + ' not found');
    }
}

export class UserWithoutSidekickException extends NotFoundException {
    constructor(postid: string) {
        super('User with id ' + postid + ' doesn\'t have sidekick');
    }
}

export default UserNotFoundException;