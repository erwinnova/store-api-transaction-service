import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import {
  ClickHouseClient,
  ClickHouseModule,
} from '@depyronick/nestjs-clickhouse';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ClickHouseModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          host: config.get('DB_HOST'),
          database: config.get('DB_NAME'),
          password: config.get('DB_PASSWORD'),
          username: config.get('DB_USERNAME'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    // {
    //   provide: 'CLICKHOUSE_ASYNC_INSTANCE_TOKEN',
    //   useFactory: (config, configService) => {
    //     return new ClickHouseClient({
    //       host: config.get('DB_HOST'),
    //       database: config.get('DB_NAME'),
    //       password: config.get('DB_PASSWORD'),
    //       username: config.get('DB_USERNAME'),
    //     });
    //   },
    // },
  ],
})
export class TransactionModule {}
