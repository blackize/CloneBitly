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
    private readonly LIMIT = 10; // Max 10 link creations per minute per IP
    private readonly WINDOW_SECONDS = 60;

    constructor(private redisService: RedisService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const forwardedFor = request.headers['x-forwarded-for'];
        const clientIp =
            (typeof forwardedFor === 'string'
                ? forwardedFor.split(',')[0].trim()
                : Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : null) ||
            request.headers['x-real-ip'] ||
            request.ip ||
            'unknown';

        const key = `ratelimit:shorten:${clientIp}`;

        try {
            const count = await this.redisService.increment(key, this.WINDOW_SECONDS);

            if (count > this.LIMIT) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.TOO_MANY_REQUESTS,
                        message: 'Rate limit exceeded. Please wait a minute before shortening more links.',
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
            // If Redis is down, allow the request (fail open) and log it
            console.error('Rate limit check failed (Redis error):', error);
            return true;
        }
    }
}
