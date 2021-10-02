import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './service/jwt.service';

const JwtModuleConfig = JwtModule.register({
  secret: 'hello',
  signOptions: { expiresIn: '300s' },
});

@Module({
  imports: [JwtModuleConfig, ConfigModule],
  providers: [JwtService],
  exports: [JwtModuleConfig, JwtService],
})
export class JwtProviderModule {}
