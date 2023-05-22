import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpStatus,
  HttpException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { JwtAuthGuard } from '../auth/jwtAuthGuard';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userForAuth: AuthService,
  ) {}

  @Post()
  async createUser(@Body() userDto: AuthDto): Promise<string> {
    return await this.userForAuth.create(userDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Get('jwt/:token')
  @UseGuards(JwtAuthGuard)
  async getUserByJwt(@Param('token') token: string): Promise<User> {
    const res = await this.usersService.verifyToken(token);
    return this.usersService.findOneById(res.id);
  }

  @Post('authUser')
  async authUser(@Body() userDto: AuthDto): Promise<string> {
    return await this.userForAuth.getTokenSign(userDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Додайте гуард до цього маршруту
  yourEndpoint(@Req() request: Request) {
    // Отримайте результат гуарда з об'єкта запиту
    const isAuthenticated = request; // Припустимо, що це властивість гуарда

    // Використовуйте результат гуарда за потреби
    if (isAuthenticated) {
      // Логіка, коли гуард пройшов успішно
    } else {
      // Логіка, коли гуард не пройшов успішно
    }
  }
}
