import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
