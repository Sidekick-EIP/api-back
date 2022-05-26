import { NotFoundException } from "@nestjs/common";

class UserNotFoundException extends NotFoundException {
    constructor(postid: string) {
        super('User with id ' + postid + 'not found');
    }
}

export default UserNotFoundException;