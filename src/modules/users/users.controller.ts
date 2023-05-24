import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from './entity/user.entity';
import { User } from './user.decorator';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { LocalAuthGuard } from '../auth/jwt-auth.guard';

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
  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findOneById(id);
  }

  @Get()
  @UseGuards(LocalAuthGuard)
  async getCurrentUser(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Post('login')
  async login(@Body() user: AuthDto): Promise<any> {
    return await this.userForAuth.login(user);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async test(@Body() userDto: AuthDto, res: any): Promise<void> {
  //   return await this.userForAuth.login(userDto, res);
  // }
}
