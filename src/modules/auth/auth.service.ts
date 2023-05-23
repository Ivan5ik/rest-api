import { Injectable, Inject, Param, Res } from '@nestjs/common';
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

  async login(userForAuth: AuthDto, @Res() res: any): Promise<void> {
    const resultFind = await this.authRepository.findOne<Auth>({
      where: { name: userForAuth.name, password: userForAuth.password },
    });

    if (resultFind) {
      const token = this.jwtService.sign({
        name: resultFind.dataValues.name,
        id: resultFind.dataValues.id,
      });

      res.header('Authorization', `Bearer ${token}`);
      res.send(); // Отправляем пустой ответ

      // Или можно использовать res.json() для отправки объекта вместо пустого ответа
      // res.json({});
    } else {
      throw new Error('name and password is not valid');
    }
  }
}
