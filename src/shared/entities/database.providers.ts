import { DataSource } from 'typeorm';

import {ConfigService} from "@nestjs/config";

const configService = new ConfigService();
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get("HOST"),
        port: configService.get("PORT"),
        username: configService.get("DBUSER"),
        password: configService.get("DBPASSWORD"),
        database: configService.get("DBNAME"),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: configService.get("SYNCHRONIZE"),
      });

      return dataSource.initialize();
    },
  },
];
