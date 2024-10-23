import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectEntityManager() private readonly db: EntityManager) {}

  async auth(nickname: string, password: string): Promise<number> {
    const record = await this.db.query(
      /**sql */ `
      select id, nickname from test.users where nickname = $1 and (password = crypt($2, password)) 
      `,
      [nickname, password],
    );

    return record[0]?.id;
  }

  async updatePassword(userId: number, password: string): Promise<void> {
    await this.db.query(
      /**sql */ `
      UPDATE  test.users
      SET password = crypt($1, gen_salt('md5')) 
      WHERE id = $2 ;
      `,
      [password, userId],
    );
  }
}
