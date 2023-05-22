import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

export const USER_REPOSITORY = 'UserRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('Errorka', HttpStatus.UNAUTHORIZED);
    }
  }
}
