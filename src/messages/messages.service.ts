import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { kill } from 'process';

@Injectable()
export class MessagesService {
	constructor(private prisma: PrismaService) { }

	public async getMessages(userId: string) {
        return {
			"messages": [
			  {
				"senderId" : 1,
				"receverId": 2,
				"date": 1662418101,
				"content": "Bonjour",
				"seen": true
			  },
			  {
				"senderId" : 2,
				"receverId": 1,
				"date": 1662418101,
				"content": "Bonjour Sidekick, comment vas tu ?",
				"seen": true
			  },
			  {
				"senderId" : 2,
				"receverId": 1,
				"date": 1662418101,
				"content": "As tu fais du sport aujourd'hui ?",
				"seen": true
			  },
			  {
				"senderId" : 1,
				"receverId": 2,
				"date": 1662418101,
				"content": "J'ai pas encore fait ma séance tu veux que on la fasse ensemble ?",
				"seen": true
			  },
			  {
				"senderId" : 2,
				"receverId": 1,
				"date": 1662418101,
				"content": "Avec plaisir !!",
				"seen": false
			  },
			  {
				"senderId" : 2,
				"receverId": 1,
				"date": 1662418101,
				"content": "On se fait ca à quelle heure ?",
				"seen": false
			  }
			]
		  }
    }
}
