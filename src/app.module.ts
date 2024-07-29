import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClickHouseClient,
  ClickHouseModule,
} from '@depyronick/nestjs-clickhouse';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // ClickHouseModule.registerAsync({
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       host: config.get('DB_HOST'),
    //       database: config.get('DB_NAME'),
    //       password: config.get('DB_PASSWORD'),
    //       username: config.get('DB_USERNAME'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
