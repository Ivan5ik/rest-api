import { Injectable, Inject } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthDto } from './dto/auth.dto';

export const USER_REPOSITORY = 'UserRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly authRepository: typeof Auth,
  ) {}

  async create(userForAuth: AuthDto): Promise<Auth> {
    return await this.authRepository.create<Auth>(userForAuth);
  }
}
