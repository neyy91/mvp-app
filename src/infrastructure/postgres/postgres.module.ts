import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity, ItemsEntity } from './entities';
import { ItemsRepository, UsersRepository } from './repositories';
import { ConfigModule, ConfigService } from '@nestjs/config';

const entities = [UsersEntity, ItemsEntity];

const repos: Provider[] = [UsersRepository, ItemsRepository];

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRES_CONNECTION'),
        entities,
        connectTimeoutMS: 10000,
      }),
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: repos,
  exports: repos,
})
export class PostgresModule {}
