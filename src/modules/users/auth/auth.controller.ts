import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createUser(@Body() authDto: AuthDto): Promise<AuthDto> {
    const a = await this.authService.create(authDto);
    console.log(a);

    return a;
    // this.usersService.create(userDto);
  }
}
