import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/domain/auth/decorators/public.decorator';
import { ItemsService } from '../services/items.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllUserItems(@Request() req) {
    return this.itemsService.getByOwner(req.user.userId);
  }

  @Post('buy')
  buy(@Request() req, @Body() body) {
    return this.itemsService.buyItem(req.user.userId, body.itemId);
  }

  @Public()
  @Get('all')
  getAll() {
    return this.itemsService.getAll();
  }

  @Public()
  @Get('tradable')
  tradableInfo() {
    return this.itemsService.tradableInfo();
  }
}
