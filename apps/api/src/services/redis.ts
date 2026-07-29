import type IORedis from 'ioredis';

const Redis: new (...args: any[]) => IORedis = (await import('ioredis')).default as any;

export const redis: IORedis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('error', (err: Error) => {
  console.error('Redis connection error:', err);
});
