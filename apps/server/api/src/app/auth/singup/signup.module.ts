import { Module } from '@nestjs/common';
import { UsersSchemaModule } from '@quickhost/server';
import { LoginModule, LoginService } from '../login';
import { SignupResolver } from './definators/resolver/signup.resolver';
import { SignupPipeline } from './pipeline/signup.pipeline';
import { SignupRepository } from './repository/signup.repository';
import { SignupService } from './services/signup.service';

@Module({
  imports: [UsersSchemaModule, LoginModule],
  providers: [SignupResolver, SignupPipeline, SignupService, SignupRepository],
})
export class SignupModule {}
