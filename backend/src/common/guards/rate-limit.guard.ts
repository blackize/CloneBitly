import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
    private readonly LIMIT = 5; // Max 5 requests
    private readonly WINDOW_SECONDS = 60; // Per 60 seconds

    constructor(private redisService: RedisService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';

        const key = `ratelimit:shorten:${ip}`;

        try {
            const count = await this.redisService.increment(key, this.WINDOW_SECONDS);

            if (count > this.LIMIT) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.TOO_MANY_REQUESTS,
                        message: 'Too many requests. Please try again after a minute.',
                        error: 'Too Many Requests',
                    },
                    HttpStatus.TOO_MANY_REQUESTS,
                );
            }

            return true;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            // If Redis is down, we allow the request (fail open) but log it
            console.error('Rate limit check failed (Redis error):', error);
            return true;
        }
    }
}
