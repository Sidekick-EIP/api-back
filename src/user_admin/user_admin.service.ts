import { EditInfosDto } from './dto/user_admin.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAdminService {
  constructor(private prismaService: PrismaService) { }

  findAll({ email, hasSidekick, cursor }: { email: string, hasSidekick: boolean, cursor: number }) {
    let whereClause = {
      ...(email && { user: { email: { contains: email } } }),
      ...(hasSidekick !== undefined && {
        sidekick_id: hasSidekick ? { not: null } : null
      })
    };

    let paginationClause = {
      skip: cursor * 10,
      take: 10,
    };

    return this.prismaService.userData.findMany({
      where: whereClause,
      include: {
        user: true,
      },
      ...paginationClause
    });
  }

  update(userId: string, updateInfos: EditInfosDto) {
    return this.prismaService.userData.update({
      where: { userId },
      data: updateInfos,
    });
  }
}
