import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(reporter: string, reason: string) {
    const user = await this.prisma.userData.findUnique({
      where: {
        userId: reporter,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.sidekick_id)
      throw new NotFoundException('User does not have a sidekick');

    return await this.prisma.reports.create({
      data: {
        reason: reason,
        reporterId: reporter,
        userId: user.sidekick_id,
      },
    });
  }
}
