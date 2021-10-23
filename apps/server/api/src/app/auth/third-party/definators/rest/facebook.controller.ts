import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('facebook')
export class FacebookLoginController {
  @Get('login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req): Promise<string | void> {
    return 'hello';
  }

  @Get('redirect')
  @UseGuards(AuthGuard('facebook'))
  googleAuthRedirect(@Req() req) {
    console.log(req);
    return 'logged in';
  }
}
