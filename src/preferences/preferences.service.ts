import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePreferenceDto } from "./dto/update-preference.dto";

@Injectable()
export class PreferencesService {
  constructor(private prismaService: PrismaService) {}

  async update(updatePreferenceDto: UpdatePreferenceDto, email: string) {
    return await this.prismaService.user.update({
      where: { email },
      data: {
        Preferences: {
          updateMany: {
            where: {},
            data: updatePreferenceDto,
          },
        },
      },
    });
  }

  async get(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { Preferences: true },
    });

    return user.Preferences;
  }
}
