import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@codegenie/serverless-express';
import express from 'express';

let cachedServer: any;

async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new (require('@nestjs/platform-express').ExpressAdapter)(expressApp));
        nestApp.enableCors();
        await nestApp.init();
        cachedServer = serverlessExpress({ app: expressApp });
    }
    return cachedServer;
}

export const handler = async (event: any, context: any, callback: any) => {
    const server = await bootstrap();
    return server(event, context, callback);
};
