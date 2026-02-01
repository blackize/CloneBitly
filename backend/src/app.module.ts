import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { RedirectController } from './redirect.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LinksService } from './links.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RedisModule],
  controllers: [AppController, RedirectController],
  providers: [AppService, PrismaService, LinksService, ConfigService],
})
export class AppModule { }
