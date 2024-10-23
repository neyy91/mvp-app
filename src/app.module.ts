import { Module } from '@nestjs/common';
import { UsersModule } from './domain/users/users.module';
import { ItemsModule } from './domain/items/items.module';
import { UsersController, UsersService } from './domain/users';
import { ItemsService } from './domain/items/services/items.service';
import { ItemsController } from './domain/items/controllers/items.controller';
import { PostgresModule } from './infrastructure/postgres';
import { AuthModule } from './domain/auth/auth.module';
import { AuthController } from './domain/auth/controllers';
import { AuthService } from './domain/auth/services';
import { RedisModule } from './infrastructure/redis';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsersModule,
    ItemsModule,
    PostgresModule,
    AuthModule,
    RedisModule,
    HttpModule,
  ],
  controllers: [UsersController, ItemsController, AuthController],
  providers: [UsersService, ItemsService, AuthService],
})
export class AppModule {}
