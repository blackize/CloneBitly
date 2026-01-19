import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RedirectController } from './redirect.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LinksService } from './links.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, RedirectController],
  providers: [AppService, PrismaService, LinksService],
})
export class AppModule { }
