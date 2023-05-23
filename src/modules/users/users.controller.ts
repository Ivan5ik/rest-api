import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  async authUser(@Body() userDto: AuthDto, res: any): Promise<void> {
    return await this.userForAuth.login(userDto, res);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async test(@Body() userDto: AuthDto, res: any): Promise<void> {
    return await this.userForAuth.login(userDto, res);
  }
}
