import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createUser(@Body() authDto: AuthDto): Promise<string> {
    return await this.authService.create(authDto);
  }
}
