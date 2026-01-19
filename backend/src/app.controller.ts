import { Controller, Get, Post, Body, Param, Res, Req, Headers, ConflictException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppService } from './app.service';
import { LinksService } from './links.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly linksService: LinksService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async healthCheck() {
    try {
      await this.linksService.healthCheck();
      return { status: 'ok', database: 'connected' };
    } catch (error: any) {
      return { status: 'error', database: 'disconnected', error: error.message };
    }
  }

  @Post('links')
  async shorten(@Body() body: { url: string; customSlug?: string }) {
    try {
      return await this.linksService.createShortLink(body.url, body.customSlug);
    } catch (err: any) {
      if (err.message === 'Custom slug already in use') {
        throw new ConflictException(err.message);
      }
      throw err;
    }
  }

}
