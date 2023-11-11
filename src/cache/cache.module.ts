import { CacheModule as CM } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [CM.register({ ttl: Number(process.env.CACHE_TTL) })],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
