import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { PrismaService } from './prisma.service';

let cachedServer: any;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();

        // Enable JSON parsing
        expressApp.use(express.json());
        expressApp.use(express.urlencoded({ extended: true }));

        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

        // Enable CORS
        nestApp.enableCors({
            origin: true,
            credentials: true,
        });

        // Get Prisma service and enable shutdown hooks
        const prismaService = nestApp.get(PrismaService);
        prismaService.enableShutdownHooks(nestApp);

        await nestApp.init();

        cachedServer = expressApp;
    }
    return cachedServer;
}

export default async function handler(req: any, res: any) {
    const app = await bootstrap();
    return app(req, res);
}
