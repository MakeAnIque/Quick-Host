import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginModelInputType } from '../../dto/login.input.entity';
import { LoginModelObjectType } from '../../dto/login.output.entity';
import { LoginPipeline } from '../../pipeline/login.pipeline';

@Resolver()
export class LoginResolver {
  constructor(private loginPipeline: LoginPipeline) {}

  @Query(() => String)
  async _() {
    return '';
  }

  @Mutation(() => LoginModelObjectType, { nullable: true })
  async login(@Args('loginDto') loginDto: LoginModelInputType) {
    return await this.loginPipeline
      .createObservablesEmit<LoginModelInputType>(loginDto)
      .initializePipeline<LoginModelInputType>();
  }
}
