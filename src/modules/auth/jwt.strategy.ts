import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'), // Замініть на ваш секретний ключ JWT
    });
  }

  async validate(payload: any) {
    // Цей метод викликається після успішної перевірки JWT.
    // Ви можете додатково перевірити або отримати дані користувача тут.
    return { userId: payload.sub, username: payload.username };
  }
}
