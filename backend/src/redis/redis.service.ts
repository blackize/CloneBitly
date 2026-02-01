import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis | null) { }

  async get<T>(key: string): Promise<T | null> {
    if (!this.redisClient) return null;
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    if (!this.redisClient) return;
    const serializedValue = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redisClient.setex(key, ttlSeconds, serializedValue);
    } else {
      await this.redisClient.set(key, serializedValue);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.redisClient) return;
    await this.redisClient.del(key);
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }

  // Add a health check method for Redis
  async ping(): Promise<boolean> {
    if (!this.redisClient) return false;

    // Check if client is in a state that can ping
    if (this.redisClient.status !== 'connect' && this.redisClient.status !== 'ready') {
      console.warn(`Redis client status is ${this.redisClient.status}, ping skipped.`);
      return false;
    }

    try {
      const result = await this.redisClient.ping();
      return result === 'PONG';
    } catch (error) {
      console.error('Redis ping failed:', error);
      return false;
    }
  }
}
