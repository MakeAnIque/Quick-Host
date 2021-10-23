import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Auth0Guards } from '../../../passport';
// import { User } from '@quick-host/decorators';
import { ThirdPartyAuthPipeline } from '../../pipeline/third-party.pipeline';

@Controller('auth/auth0')
export class Auth0Controller {
  constructor(
    private readonly thirdPartyAuthPipeline: ThirdPartyAuthPipeline
  ) {}

  @Get('initiateDedicatedAuth')
  @UseGuards(Auth0Guards)
  async auth0CallbackUrlListen() {
    return;
  }
}
