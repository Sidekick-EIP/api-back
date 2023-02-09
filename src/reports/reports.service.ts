import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(reporter: string, reason: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: reporter },
    });

    const userInfo = await this.prisma.userData.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!userInfo.sidekick_id)
      throw new NotFoundException("User does not have a sidekick");

    await Promise.all([
      this.prisma.userData.update({
        where: {
          userId: userInfo.sidekick_id,
        },
        data: {
          sidekick_id: null,
        },
      }),
      this.prisma.userData.update({
        where: {
          userId: user.id,
        },
        data: {
          sidekick_id: null,
        },
      }),
    ]);

    return await this.prisma.reports.create({
      data: {
        reason: reason ?? "No reason provided",
        reporterEmail: reporter,
        userId: userInfo.sidekick_id,
      },
    });
  }
}
