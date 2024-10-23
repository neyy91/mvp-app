import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { redisConst } from 'common/constants';
import { ItemsEntity } from 'src/infrastructure/postgres/entities';
import { ItemsRepository } from 'src/infrastructure/postgres/repositories';

export interface BalanceResponse {
  balance: number;
}

export interface TradableInfo {
  marketHashName: string;
  minPrice: number;
  minPriceTradable: number;
}

@Injectable()
export class ItemsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly repo: ItemsRepository,
    private readonly httpService: HttpService,
  ) {}

  async getAll(): Promise<Array<ItemsEntity>> {
    return this.repo.getAll();
  }

  async getByOwner(ownerId: number): Promise<Array<ItemsEntity>> {
    return this.repo.getByOwner(ownerId);
  }

  async buyItem(userId: number, itemId: number): Promise<BalanceResponse> {
    const balance = await this.repo.buyItem(userId, itemId);

    return {
      balance,
    };
  }

  async tradableInfo(): Promise<Array<TradableInfo>> {
    const cache = (await this.cacheManager.get(
      redisConst.redisKey,
    )) as Array<TradableInfo> | null;

    if (cache) {
      return cache;
    }

    const skinport = await Promise.all([
      this.itemsRequest(),
      this.itemsRequest(1),
    ]).catch((e) => {
      console.log(`Ошибка запроса итемов с api.skinport : ${e}`);
      return e;
    });

    const tradableItemsMap: any = new Map(
      skinport[0].data.map((item) => [item.market_hash_name, item]),
    );
    const items = skinport[1].data.map(({ market_hash_name, min_price }) => ({
      market_hash_name,
      min_price,
      min_price_tradable: tradableItemsMap.get(market_hash_name)?.min_price,
    }));

    try {
      await this.cacheManager.set(redisConst.redisKey, items, redisConst.ttl);
    } catch (error) {
      console.log(`Кэщ не был обновлен : ${error}`);
    }

    return items;
  }

  private itemsRequest(tradable = 0): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(
      `https://api.skinport.com/v1/items?app_id=730&currency=RUB&tradable=${tradable}`,
    );
  }
}
