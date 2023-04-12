import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@config/app.config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from '@app/modules/health/health.module';
import { ThrottlerModule } from '@nestjs/throttler';

/** This is a TypeScript module that imports various modules and sets up a TypeORM connection using
configuration values obtained from a ConfigService. */
@Module({
  imports: [
    AppConfigModule,
    CoreModule,
    ThrottlerModule.forRoot({
      ttl: 60, // The time-to-live for each request count record (in seconds)
      limit: 10, // The maximum number of requests allowed in the given time period
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'sqlite' | 'postgres'>('db.type'),
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.user'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('db.synchronize'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
