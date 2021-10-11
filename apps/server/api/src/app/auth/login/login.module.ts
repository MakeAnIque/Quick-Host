import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtProviderModule } from '../jwt/jwt.module';
import { PassportStrategyModule } from '../passport/passport.module';
import { LoginPipeline } from './pipeline/login.pipeline';
import { LoginResolver } from './definators/resolver/login.resolver';

import { LoginService } from './service/login.service';
import { LoginRepository } from './repository/login.repository';
import { UsersSchemaModule } from '@quickhost/server';

@Module({
  controllers: [],
  imports: [
    ConfigModule,
    PassportStrategyModule,
    JwtProviderModule,
    UsersSchemaModule,
  ],
  providers: [
    LoginResolver,
    LoginService,
    LoginPipeline,
    ConfigService,
    LoginRepository,
  ],
  exports: [
    LoginService,
    LoginRepository,
    ConfigService,
    JwtProviderModule,
    PassportStrategyModule,
  ],
})
export class LoginModule {}
