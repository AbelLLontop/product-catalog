import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const hashPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashPassword,
        },
      });
      delete user.password;
      return this.generateToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');
    delete user.password;
    return this.generateToken(user.id, user.email);
  }

  private async generateToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });
    return {
      access_token,
    };
  }
}
