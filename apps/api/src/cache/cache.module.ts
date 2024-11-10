import { redisStore } from 'cache-manager-redis-yet'
import { Module } from '@nestjs/common'
import {
  CacheModule as NestCacheModule,
  CacheStore,
} from '@nestjs/cache-manager'

@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        })

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        }
      },
    }),
  ],
})
export class CacheModule {}
