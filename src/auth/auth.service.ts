import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) { }

  public async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    });

    if (!user)
      throw new ForbiddenException('Credentials incorrect');

    const isValid = await argon.verify(user.password, dto.password);
    if (!isValid)
      throw new ForbiddenException('Credentials incorrect');

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  public async register(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
      }
    }).catch(error => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials incorrect');
        }
      }
      throw error;
    });

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        userId,
        email,
      }, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: 60 * 60,
      }),
      this.jwtService.signAsync({
        userId,
        email,
      }, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      })
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    }
  }
}
