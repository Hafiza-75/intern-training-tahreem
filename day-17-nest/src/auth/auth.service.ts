import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(registerDto: RegisterDto) {
    // 1. Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. Create user in database
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    // 4. Don't return password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  // Login existing user
  async login(loginDto: LoginDto) {
    // 1. Find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    // 2. If user doesn't exist
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Compare entered password with hashed password
    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    // 4. If password is incorrect
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 5. Generate JWT access token
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    // 6. Login successful
    return {
      message: 'Login successful',
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}