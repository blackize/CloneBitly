import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class LinksService {
    constructor(private prisma: PrismaService) { }

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

        return this.prisma.shortLink.create({
            data: {
                originalUrl,
                slug,
            },
        });
    }

    async getOriginalUrl(slug: string, metadata?: { ip?: string; ua?: string; referrer?: string }) {
        const link = await this.prisma.shortLink.findUnique({
            where: { slug, isActive: true },
        });

        if (!link) {
            throw new NotFoundException('Short link not found');
        }

        // Increment click count and record event asynchronously
        this.prisma.$transaction([
            this.prisma.shortLink.update({
                where: { id: link.id },
                data: { clickCount: { increment: 1 } },
            }),
            this.prisma.clickEvent.create({
                data: {
                    shortLinkId: link.id,
                    ipAddress: metadata?.ip,
                    userAgent: metadata?.ua,
                    referrer: metadata?.referrer,
                },
            }),
        ]).catch(err => console.error('Failed to record click data', err));

        return link.originalUrl;
    }

    async healthCheck() {
        // Simple query to test database connection
        await this.prisma.$queryRaw`SELECT 1`;
        return true;
    }
}
