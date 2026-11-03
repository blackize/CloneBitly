import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LinksService } from './links.service';
import { RateLimitGuard } from './common/guards/rate-limit.guard';

@Controller('api')
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
  @UseGuards(RateLimitGuard)
  async shorten(@Body() body: { url: string; customSlug?: string }) {
    return await this.linksService.createShortLink(body?.url, body?.customSlug);
  }

  @Get('links/:slug/stats')
  async getStats(@Param('slug') slug: string) {
    return await this.linksService.getLinkStats(slug);
  }
}
