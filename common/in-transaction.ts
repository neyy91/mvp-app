import type { QueryRunner } from 'typeorm';
import { getConnection } from 'typeorm';
import { LvlIsolation } from './constants';

export const inTransaction = async <T>(
  func: (queryRunner: QueryRunner) => Promise<T>,
): Promise<T> => {
  const qr = getConnection().createQueryRunner();

  try {
    await qr.startTransaction(LvlIsolation.REPEATABLE_READ);

    const result = await func(qr);

    await qr.commitTransaction();

    return result;
  } catch (e) {
    if (qr.isTransactionActive) {
      await qr.rollbackTransaction();
    }

    throw e;
  } finally {
    await qr.release();
  }
};
