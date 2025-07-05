import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        level: configService.get('LOG_LEVEL') || 'info',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
          winston.format.errors({ stack: true }),
          winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize({ all: true }),
              winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
              winston.format.errors({ stack: true }),
              winston.format.printf(({ level, message, timestamp, context, ...meta }) => {
                const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
                const contextStr = context ? `[${context}]` : '';
                return `${level}: ${contextStr} ${message} ${metaStr}`.trim();
              }),
            ),
          }),
          new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
          }),
          new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d'
          }),
          new DailyRotateFile({
            filename: 'logs/auth-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '90d'
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_URI'),
        entities: [join('**', '*.model.js')],
        synchronize: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
