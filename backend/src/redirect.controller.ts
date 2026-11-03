import { Controller, Get, Param, Res, Req, Headers, NotFoundException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { LinksService } from './links.service';

@Controller() // No global prefix for slug redirects
export class RedirectController {
  constructor(private readonly linksService: LinksService) { }

  @Get(':slug')
  async redirect(
    @Param('slug') slug: string,
    @Res() res: Response,
    @Req() req: Request,
    @Headers('user-agent') ua?: string,
    @Headers('referer') referrer?: string,
  ) {
    if (slug.endsWith('+')) {
      const realSlug = slug.slice(0, -1);
      return res.redirect(`/stats/${realSlug}`);
    }

    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    try {
      const originalUrl = await this.linksService.getOriginalUrl(slug, { ip, ua, referrer });
      return res.redirect(originalUrl);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 20);
        if (sanitizedSlug.length >= 2) {
          return res.redirect(`/?claim=${encodeURIComponent(sanitizedSlug)}`);
        }
        return res.redirect('/');
      }
      throw error;
    }
  }
}
