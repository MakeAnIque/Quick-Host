import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategies/passport-facebook.strategy';
import { JwtProviderModule } from '../jwt/jwt.module';
import { JwtStrategy } from './strategies/passport-jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth0Guards } from './strategies/auth0.strategy';

@Module({
  imports: [PassportModule, JwtProviderModule, ConfigModule, Auth0Guards],
  providers: [
    JwtStrategy,
    // {
    //   provide: FacebookStrategy,
    //   useValue: ConfigService,
    // },
    FacebookStrategy,
    ConfigService,
  ],
  exports: [PassportModule],
})
export class PassportStrategyModule {}
