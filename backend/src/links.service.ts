import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class LinksService {
    private readonly REDIS_CACHE_TTL_SECONDS = 3600; // Cache for 1 hour

    constructor(
        private prisma: PrismaService,
        private redisService: RedisService,
    ) { }

    async createShortLink(originalUrl: string, customSlug?: string) {
        let slug = customSlug;

        if (slug) {
            const existing = await this.prisma.shortLink.findUnique({
                where: { slug },
            });
            if (existing) {
                throw new Error('Custom slug already in use');
            }
        } else {
            // Generate a random slug if none provided
            slug = Math.random().toString(36).substring(7);
        }

        const newLink = await this.prisma.shortLink.create({
            data: {
                originalUrl,
                slug,
            },
        });

        // Cache the new link's original URL in Redis
        await this.redisService.set(
            `shortlink:${newLink.slug}`,
            newLink.originalUrl,
            this.REDIS_CACHE_TTL_SECONDS,
        );

        return newLink;
    }

    async getOriginalUrl(slug: string, metadata?: { ip?: string; ua?: string; referrer?: string }) {
        // Try to get from Redis cache first
        const cachedUrl = await this.redisService.get<string>(`shortlink:${slug}`);
        if (cachedUrl) {
            // Increment click count asynchronously
            this.prisma.shortLink.update({
                where: { slug },
                data: { clickCount: { increment: 1 } },
            }).catch(err => console.error('Failed to update click count (from cache)', err));
            return cachedUrl;
        }

        const link = await this.prisma.shortLink.findUnique({
            where: { slug },
        });

        if (!link) {
            throw new NotFoundException('Short link not found');
        }

        // Store in Redis cache
        await this.redisService.set(
            `shortlink:${link.slug}`,
            link.originalUrl,
            this.REDIS_CACHE_TTL_SECONDS,
        );

        // Increment click count asynchronously
        this.prisma.shortLink.update({
            where: { id: link.id },
            data: { clickCount: { increment: 1 } },
        }).catch(err => console.error('Failed to update click count', err));

        return link.originalUrl;
    }

    async healthCheck() {
        // Simple query to test database connection
        await this.prisma.$queryRaw`SELECT 1`;

        // Check Redis connection
        const redisConnected = await this.redisService.ping();
        if (!redisConnected) {
            throw new Error('Redis not connected');
        }

        return true;
    }
}
