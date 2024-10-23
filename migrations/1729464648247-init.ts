/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class init1729464648247 implements MigrationInterface {
  async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    nickname TEXT NOT NULL DEFAULT 'user-nickname',
    balance INT DEFAULT 100500,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
  );`);


    await queryRunner.query(/* sql */`
        INSERT INTO public.users(
        id, nickname, balance, created_at)
        VALUES (DEFAULT , DEFAULT , DEFAULT,  DEFAULT);
    `);
  }

  async down (queryRunner: QueryRunner): Promise<void> {
    //to do
  }
}
