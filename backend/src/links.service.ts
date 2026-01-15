import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class LinksService {
    constructor(private prisma: PrismaService) { }

    async createShortLink(originalUrl: string) {
        // Basic slug generation - can be improved later
        const slug = Math.random().toString(36).substring(7);

        return this.prisma.shortLink.create({
            data: {
                originalUrl,
                slug,
            },
        });
    }

    async getOriginalUrl(slug: string) {
        const link = await this.prisma.shortLink.findUnique({
            where: { slug, isActive: true },
        });

        if (!link) {
            throw new NotFoundException('Short link not found');
        }

        // Increment click count asynchronously
        this.prisma.shortLink.update({
            where: { id: link.id },
            data: { clickCount: { increment: 1 } },
        }).catch(err => console.error('Failed to increment click count', err));

        return link.originalUrl;
    }
}
