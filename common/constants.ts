export enum LvlIsolation {
  READ_UNCOMMITTED = 'READ UNCOMMITTED',
  READ_COMMITTED = 'READ COMMITTED',
  REPEATABLE_READ = 'REPEATABLE READ',
  SERIALIZABLE = 'SERIALIZABLE',
}

export const expiresJWT = '60m';

export const jwtConstants = {
  secret: 'secret',
};

export const redisConst = {
  redisKey: 'tradableInfo',
  ttl: 5 * 1000 * 60, // 5 мин кэш
};
