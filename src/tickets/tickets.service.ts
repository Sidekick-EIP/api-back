import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ModeratorAnswerDto } from './dto/moderator-answer.dto';
import { SESClient, SES } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { UserAnswerDto } from './dto/user-answer.dto';

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
    const ticket = await this.prismaService.ticket.create({
      data: {
        description: dto.content,
        title: dto.title,
        status: "OPEN",
        last_action: "OPENED_BY_USER",
        user: {
          connect: {
            email: email
          }
        }
      }
    })

    const response = await this.prismaService.response.create({
      data: {
        content: dto.content,
        user: {
          connect: {
            email: email
          }
        },
        ticket: {
          connect: {
            id: ticket.id
          }
        }
      }
    });

    return { ticket, response };
  }

  async find(cursor: number) {
    return await this.prismaService.ticket.findMany({
      take: 10,
      skip: cursor,
      include: {
        user: true,
        responses: {
          orderBy: {
            createdAt: 'asc'
          },
          include: {
            user: true,
          },
        },
      }
    });
  }

  async findOne(id: number) {
    return await this.prismaService.ticket.findUnique({
      where: {
        id: id
      },
      include: {
        user: true,
        responses: {
          orderBy: {
            createdAt: 'asc'
          },
          include: {
            user: true,
          },
        },
      }
    })
  }

  async user_answer({ answer }: UserAnswerDto, id: number) {
    const ticket = await this.prismaService.ticket.update({
      where: {
        id: id
      },
      data: {
        last_action: "ANSWERED_BY_USER",
      },
      include: {
        user: true
      }
    });

    const response = await this.prismaService.response.create({
      data: {
        content: answer,
        user: {
          connect: {
            email: ticket.user.email
          }
        },
        ticket: {
          connect: {
            id: id
          }
        }
      }
    });

    return { response, message: "Your response has been sent" };
  }

  async answer({ answer }: ModeratorAnswerDto, id: number) {
    const ticket = await this.prismaService.ticket.update({
      where: {
        id: id
      },
      data: {
        status: "ANSWERED",
        last_action: "ANSWERED_BY_MODERATOR",
      },
      include: {
        user: true
      }
    });

    const response = await this.prismaService.response.create({
      data: {
        content: answer,
        user: {
          connect: {
            email: ticket.user.email
          }
        },
        ticket: {
          connect: {
            id: id
          }
        }
      }
    });

    const params = this.getParams(ticket.user.email, answer, "Your ticket has been answered by a moderator: " + answer);

    const res = await this.SES.sendTemplatedEmail({
      ...params, Template: "ticket-response",
      TemplateData: JSON.stringify({ admin_response: answer, ticket_name: ticket.title })
    });

    return { res, message: "Email has been sent" };
  }

  async close(id: number) {
    const res = await this.prismaService.ticket.update({
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

  async getTickets(email: string) {
    console.log("getTickets", email)
    return await this.prismaService.ticket.findMany({
      where: {
        user: {
          email: email
        }
      },
      include: {
        user: true,
      }
    });
  }

  async getTicketsFromId(id: string) {
    return await this.prismaService.ticket.findMany({
      where: {
        user: {
          id: id
        }
      },
      include: {
        user: true,
      }
    });
  }

  private getParams(to: string, message: string, subject: string) {
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
