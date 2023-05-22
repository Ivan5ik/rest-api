import { Injectable, Inject, Param } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

export const AUTH_REPOSITORY = 'AuthRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: typeof Auth,
    private jwtService: JwtService,
  ) {}

  async findUserByUsername(name: string): Promise<Auth> {
    return await this.authRepository.findOne({ where: { name } });
  }

  async create(userForAuth: AuthDto): Promise<string> {
    const user = await this.findUserByUsername(`${userForAuth.name}`);

    if (user) {
      return 'User was created';
      // throw new Error('User was created');
    } else {
      const result = await this.authRepository.create<Auth>(userForAuth);

      return this.jwtService.sign({
        name: userForAuth.name,
        id: result.dataValues.id,
      });
    }
  }

  async getTokenSign(userForAuth: AuthDto): Promise<any> {
    const resultFind = await this.authRepository.findOne<Auth>({
      where: { name: userForAuth.name, password: userForAuth.password },
    });

    if (resultFind) {
      return this.jwtService.sign({
        name: resultFind.dataValues.name,
        id: resultFind.dataValues.id,
      });
    } else {
      throw new Error('name and password is not valid');
    }
  }
}
