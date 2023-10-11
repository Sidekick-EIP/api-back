import { NotFoundException } from "@nestjs/common";

class UserNotFoundException extends NotFoundException {
    constructor(postemail: string) {
        super('User with email ' + postemail + ' not found.');
    }
}

export default UserNotFoundException;