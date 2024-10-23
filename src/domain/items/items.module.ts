import { Module } from '@nestjs/common';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';
import { PostgresModule } from 'src/infrastructure/postgres';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, PostgresModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
