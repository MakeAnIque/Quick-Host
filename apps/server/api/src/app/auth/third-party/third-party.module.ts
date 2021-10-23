import { Module } from '@nestjs/common';
import { LoginModule, LoginPipeline } from '../login/';

import { JwtProviderModule } from '../jwt';
import { PassportStrategyModule } from '../passport/passport.module';
import { Auth0Controller } from './definators/rest';
import { FacebookLoginController } from './definators/rest/facebook.controller';
import { ThirdPartyAuthPipeline } from './pipeline/third-party.pipeline';
import { SignupModule, SignupPipeline } from '../singup/index';
import { ThirdPartyResolver } from './definators/resolvers/thrid-party.resolver';

@Module({
  controllers: [FacebookLoginController, Auth0Controller],
  imports: [
    PassportStrategyModule,
    JwtProviderModule,
    LoginModule,
    SignupModule,
  ],
  providers: [
    ThirdPartyAuthPipeline,
    LoginPipeline,
    SignupPipeline,
    ThirdPartyResolver,
  ],
  exports: [PassportStrategyModule],
})
export class ThirdPartyAuthModule {}
