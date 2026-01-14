import { Controller, Get, Post, Body, Param, Redirect, Res } from '@nestjs/common';
import type { Response } from 'express';
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

  @Post('links')
  async shorten(@Body('url') url: string) {
    return this.linksService.createShortLink(url);
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = await this.linksService.getOriginalUrl(slug);
    return res.redirect(originalUrl);
  }
}
