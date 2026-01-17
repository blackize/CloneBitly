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

  @Post('links')
  async shorten(@Body('url') url: string, @Body('customSlug') customSlug?: string) {
    try {
      return await this.linksService.createShortLink(url, customSlug);
    } catch (err: any) {
      if (err.message === 'Custom slug already in use') {
        throw new ConflictException(err.message);
      }
      throw err;
    }
  }

  @Get(':slug')
  async redirect(
    @Param('slug') slug: string,
    @Res() res: Response,
    @Req() req: Request,
    @Headers('user-agent') ua?: string,
    @Headers('referer') referrer?: string,
  ) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const originalUrl = await this.linksService.getOriginalUrl(slug, { ip, ua, referrer });
    return res.redirect(originalUrl);
  }
}
