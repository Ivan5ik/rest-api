import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entity/auth.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, PassportModule, JwtModule],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
