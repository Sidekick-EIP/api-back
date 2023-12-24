import { EditInfosDto } from './dto/user_admin.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAdminService {
  constructor(private prismaService: PrismaService) { }

  findAll({ email, hasSidekick }: { email: string, hasSidekick: boolean }) {
    let whereClause = {
      ...(email && { user: { email: { contains: email } } }),
      ...(hasSidekick !== undefined && {
        sidekick_id: hasSidekick ? { not: null } : null
      })
    };

    return this.prismaService.userData.findMany({
      where: whereClause,
      include: {
        user: true,
      },
    });
  }

  update(userId: string, updateInfos: EditInfosDto) {
    return this.prismaService.userData.update({
      where: { userId },
      data: updateInfos,
    });
  }
}
