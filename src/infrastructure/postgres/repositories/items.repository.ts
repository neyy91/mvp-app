import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryRunner } from 'typeorm';
import { ItemsEntity, UsersEntity } from '../entities';
import { inTransaction } from 'common/in-transaction';

@Injectable()
export class ItemsRepository {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  transaction(queryRunner: QueryRunner): ItemsRepository {
    return new ItemsRepository(queryRunner.manager);
  }

  async getAll(): Promise<Array<ItemsEntity>> {
    return this.db.find(ItemsEntity);
  }

  async getByOwner(owner: number): Promise<Array<ItemsEntity>> {
    return this.db.find(ItemsEntity, {
      select: ['id', 'name', 'price', 'created_at'],
      where: {
        owner,
      },
    });
  }

  async buyItem(userId: number, itemId: number): Promise<number> {
    return inTransaction(async (qr: QueryRunner) => {
      const repo = this.transaction(qr);

      const [item, userInfo] = await Promise.all([
        repo.db.findOne(ItemsEntity, {
          select: ['price', 'owner'],
          where: {
            id: itemId,
          },
        }),
        repo.db.findOne(UsersEntity, {
          select: ['balance'],
          where: {
            id: userId,
          },
        }),
      ]);

      if (item.owner) {
        if (item.owner === userId) {
          throw new NotFoundException('Продано тебе');
        }
        throw new NotFoundException('Продано');
      }

      const currentBalance = userInfo.balance - item.price;

      if (currentBalance < 0) {
        throw new NotFoundException(`Нет денег. Не хватает: ${currentBalance}`);
      }

      await Promise.all([
        repo.db.update(ItemsEntity, itemId, {
          owner: userId,
        }),
        repo.db.update(UsersEntity, userId, {
          balance: currentBalance,
        }),
      ]);

      return currentBalance;
    });
  }
}
