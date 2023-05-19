import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './modules/users/entity/user.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://testDateBase:test12345@cluster0.5td2upo.mongodb.net/`,
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'mydatabase',
      models: [User],
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
