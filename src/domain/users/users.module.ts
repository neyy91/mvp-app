import { Module } from '@nestjs/common';
import { UsersService } from './service';
import { UsersController } from './controllers';
import { PostgresModule } from 'src/infrastructure/postgres';

@Module({
  imports: [PostgresModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
