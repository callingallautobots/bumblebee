import { Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const { method, url, socket } = req
    const ip = socket.remoteAddress
    const userAgent = req.headers['user-agent'] || ''

    const startTime = Date.now()

    res.on('finish', () => {
      const { statusCode } = res
      const contentLength = res.getHeader('content-length')
      const responseTime = Date.now() - startTime

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength}B - ${responseTime}ms - ${ip} ${userAgent}`,
        'HTTP'
      )
    })

    next()
  }
}
