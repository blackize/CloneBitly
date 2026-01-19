import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import express from 'express';
import { PrismaService } from './prisma.service';

let cachedServer: any;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new (require('@nestjs/platform-express').ExpressAdapter)(expressApp));

        // Enable CORS
        nestApp.enableCors({
            origin: true,
            credentials: true,
        });

        // Get Prisma service and enable shutdown hooks
        const prismaService = nestApp.get(PrismaService);
        prismaService.enableShutdownHooks(nestApp);

        await nestApp.init();
        cachedServer = serverlessExpress({ app: expressApp });
    }
    return cachedServer;
}

const handler = async (event: any, context: any, callback: any) => {
    const server = await bootstrap();
    return server(event, context, callback);
};

export default handler;
