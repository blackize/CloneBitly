import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private configService: ConfigService) {
        super({
            log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
            datasources: {
                db: {
                    url: configService.get<string>('DATABASE_URL'),
                },
            },
            // Increase connection timeout for serverless environments (e.g., Vercel)
            // Default is 10 seconds, increasing to 20 seconds
            __internal: {
                engine: {
                    connectTimeout: 20000,
                },
            },
        });

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
