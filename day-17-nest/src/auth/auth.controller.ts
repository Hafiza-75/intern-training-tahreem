import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { Roles } from './roles.decorator.js';
import { RolesGuard } from './roles.guard.js';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: any) {
    return this.authService.getProfile(request.user.userId);
  }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateProfile(
      @Req() request: any,
      @Body() updateProfileDto: UpdateProfileDto,
    ) {
      return this.authService.updateProfile(
        request.user.userId,
        updateProfileDto,
      );
    }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin')
  getAdminData(@Req() request: any) {
    return {
      message: 'Welcome Admin',
      user: request.user,
    };
  }
}