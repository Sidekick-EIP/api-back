import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ModeratorAnswerDto } from './dto/moderator-answer.dto';
import { SESClient, SES } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TicketsService {
  private SES: SES;

  constructor(private prismaService: PrismaService, private configService: ConfigService) {
    this.SES = new SES({
      region: this.configService.get("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      }
    });
  }

  async create(dto: CreateTicketDto, email: string) {
    return await this.prismaService.tickets.create({
      data: {
        description: dto.content,
        title: dto.title,
        status: "OPEN",
        user: {
          connect: {
            email: email
          }
        }
      }
    })
  }

  async find(cursor: number) {
    return await this.prismaService.tickets.findMany({
      take: 10,
      skip: cursor,
      include: {
        user: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prismaService.tickets.findUnique({
      where: {
        id: id
      },
      include: {
        user: true
      }
    })
  }

  async answer({ answer }: ModeratorAnswerDto, id: number) {
    const res = await this.prismaService.tickets.update({
      where: {
        id: id
      },
      data: {
        answer: answer
      },
      include: {
        user: true
      }
    });

    const params = this.getParams(res.user.email, answer, "Your ticket has been answered by a moderator: " + answer);

    const response = await this.SES.sendEmail(params);

    return { res, message: "Email has been sent" };
  }

  async close(id: number) {
    const res = await this.prismaService.tickets.update({
      where: {
        id: id
      },
      data: {
        status: "CLOSED"
      },
      include: {
        user: true
      }
    });

    const response = await this.SES.sendEmail(this.getParams(res.user.email, "Your ticket has been closed", "Your ticket has been closed"));

    return { res, message: "Email has been sent" };
  }

  private getParams(to: string, message: string, subject: string) {
    console.log(to);
    return {
      Source: "sidekick.eip@gmail.com",
      Destination: {
        ToAddresses: [to]
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: "Sidekick - " + subject,
        }
      },
    }
  }
}
