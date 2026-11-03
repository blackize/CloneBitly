import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis/redis.service';

const RESERVED_SLUGS = new Set([
    'api',
    'stats',
    'tools',
    'admin',
    'dashboard',
    'login',
    'signin',
    'signup',
    'register',
    'auth',
    'pricing',
    'pro',
    'billing',
    'about',
    'contact',
    'privacy',
    'terms',
    'abuse',
    'report',
    'blog',
    'docs',
    'help',
    'status',
    'health',
    'favicon',
    'robots',
    'sitemap',
    'logo',
    'icon',
    'apple-icon',
    '_next',
    'static',
    'public',
]);

const BLOCKED_SHORTENER_DOMAINS = new Set([
    'shortnow.site',
    'www.shortnow.site',
    'bit.ly',
    'bitly.com',
    'tinyurl.com',
    't.co',
    'goo.gl',
    'ow.ly',
    'is.gd',
    'buff.ly',
    'adf.ly',
    'cutt.ly',
    'rebrand.ly',
    'short.io',
    'rb.gy',
    'tiny.cc',
    'bl.ink',
    'snip.ly',
    'dub.sh',
    'shorturl.at',
]);

const DANGEROUS_EXTENSIONS = /\.(exe|scr|bat|cmd|msi|vbs|ps1|wsf|hta|jar)(\?|$)/i;

@Injectable()
export class LinksService {
    private readonly REDIS_CACHE_TTL_SECONDS = 3600; // Cache for 1 hour

    constructor(
        private prisma: PrismaService,
        private redisService: RedisService,
    ) { }

    private validateAndNormalizeUrl(rawUrl: string): string {
        if (!rawUrl || typeof rawUrl !== 'string') {
            throw new BadRequestException('Please provide a valid destination URL.');
        }

        const trimmed = rawUrl.trim();
        if (trimmed.length < 4 || trimmed.length > 2048) {
            throw new BadRequestException('URL length must be between 4 and 2048 characters.');
        }

        let parsed: URL;
        try {
            parsed = new URL(trimmed);
        } catch {
            throw new BadRequestException('Invalid URL format. Make sure it starts with https:// or http://.');
        }

        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            throw new BadRequestException('Only http:// and https:// URLs are allowed.');
        }

        if (parsed.username || parsed.password || trimmed.includes('@')) {
            throw new BadRequestException('URLs containing embedded credentials (@) are not allowed for security reasons.');
        }

        const hostname = parsed.hostname.toLowerCase();

        // Block localhost, private IPs, and raw IPv4/IPv6 literals
        if (
            hostname === 'localhost' ||
            hostname.endsWith('.local') ||
            hostname.endsWith('.internal') ||
            !hostname.includes('.') ||
            /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) ||
            hostname.startsWith('[')
        ) {
            throw new BadRequestException('Must point to a valid public domain name.');
        }

        // Block self-redirects and nested URL shorteners
        if (
            BLOCKED_SHORTENER_DOMAINS.has(hostname) ||
            hostname.endsWith('.shortnow.site')
        ) {
            throw new BadRequestException(
                'Shortening links from URL shorteners or shortnow.site is not permitted.',
            );
        }

        // Block direct links to executable malware payloads
        if (DANGEROUS_EXTENSIONS.test(parsed.pathname)) {
            throw new BadRequestException('Links to executable files are not allowed.');
        }

        return parsed.toString();
    }

    private validateCustomSlug(rawSlug: string): string {
        const cleaned = rawSlug.trim();
        if (cleaned.length < 2 || cleaned.length > 20) {
            throw new BadRequestException('Custom alias must be between 2 and 20 characters.');
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(cleaned)) {
            throw new BadRequestException(
                'Custom alias can only contain letters, numbers, hyphens (-), and underscores (_).',
            );
        }

        if (RESERVED_SLUGS.has(cleaned.toLowerCase())) {
            throw new ConflictException('This alias is reserved by the system. Please choose another one.');
        }

        return cleaned;
    }

    private generateRandomSlug(length = 6): string {
        const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async createShortLink(originalUrl: string, customSlug?: string) {
        const validatedUrl = this.validateAndNormalizeUrl(originalUrl);
        let slug: string;

        if (customSlug && customSlug.trim() !== '') {
            slug = this.validateCustomSlug(customSlug);
            const existing = await this.prisma.shortLink.findUnique({
                where: { slug },
            });
            if (existing) {
                throw new ConflictException('Custom slug already in use');
            }
        } else {
            // Generate a collision-free random slug
            slug = this.generateRandomSlug(6);
            for (let attempt = 0; attempt < 5; attempt++) {
                if (!RESERVED_SLUGS.has(slug.toLowerCase())) {
                    const existing = await this.prisma.shortLink.findUnique({
                        where: { slug },
                    });
                    if (!existing) break;
                }
                slug = this.generateRandomSlug(6);
            }
        }

        const newLink = await this.prisma.shortLink.create({
            data: {
                originalUrl: validatedUrl,
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

    async getLinkStats(slug: string) {
        const link = await this.prisma.shortLink.findUnique({
            where: { slug },
            select: {
                slug: true,
                originalUrl: true,
                clickCount: true,
                createdAt: true,
            },
        });

        if (!link) {
            throw new NotFoundException('Short link not found');
        }

        return link;
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
