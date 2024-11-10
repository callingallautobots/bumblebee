import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CacheService } from '../cache/cache.service'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private cacheService: CacheService,
    private readonly prefix: string,
    private readonly ttl?: number
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const cacheKey = this.cacheService.getCacheKey(
      this.prefix,
      `${request.method}:${request.url}`
    )

    const cached = await this.cacheService.get(cacheKey)
    if (cached) {
      return of(cached)
    }

    return next.handle().pipe(
      tap(async (response) => {
        await this.cacheService.set(cacheKey, response, this.ttl)
      })
    )
  }
}
