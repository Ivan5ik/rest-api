import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { User } from 'src/modules/users/entity/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;

      config = databaseConfig.development;

      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
