import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private configService: ConfigService) {
        const dbUrl = configService.get<string>('DATABASE_URL') || '';
        const separator = dbUrl.includes('?') ? '&' : '?';
        const finalUrl = `${dbUrl}${separator}connection_limit=10&connect_timeout=30`;

        super({
            log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
            datasources: {
                db: {
                    url: finalUrl,
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: any) {
        // Ensure graceful shutdown on Vercel
        app.enableShutdownHooks();
    }
}
