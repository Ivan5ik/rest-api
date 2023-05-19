import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/users/entity/user.entity';
import { AuthModule } from './modules/users/auth/auth.module';
import { Auth } from './modules/users/auth/entity/auth.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'mydatabase',
      models: [User, Auth],
      define: {
        timestamps: true,
        underscored: true,
      },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
