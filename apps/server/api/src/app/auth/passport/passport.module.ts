import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategies/passport-facebook.strategy';
import { JwtProviderModule } from '../jwt/jwt.module';
import { JwtStrategy } from './strategies/passport-jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PassportModule, JwtProviderModule, ConfigModule],
  providers: [JwtStrategy, FacebookStrategy, ConfigService],
})
export class PassportStrategyModule {}
