import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePreferenceDto } from "./dto/update-preference.dto";

@Injectable()
export class PreferencesService {
  constructor(private prismaService: PrismaService) {}

  async update(updatePreferenceDto: UpdatePreferenceDto, email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return await this.prismaService.preferences.updateMany({
      where: { userId: user.id },
      data: updatePreferenceDto,
    });
  }

  async get(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { Preferences: true },
    });

    return user.Preferences[0];
  }
}
