import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SignupModelInputType } from '../../dto/signup.input.entity';
import { SignupModelObjectType } from '../../dto/signup.output.entity';
import { SignupPipeline } from '../../pipeline/signup.pipeline';

@Resolver()
export class SignupResolver {
  constructor(public readonly signupPipeline: SignupPipeline) {}

  @Query(() => String)
  async _() {
    return '';
  }

  @Mutation(() => SignupModelObjectType, { nullable: true })
  async signup(@Args('signupDto') signupDto: SignupModelInputType) {
    try {
      const pipelineData: any = await this.signupPipeline
        .createObservablesEmit<SignupModelInputType>(signupDto)
        .initializePipeline<SignupModelInputType>();

      return pipelineData.loginOutputModel;
    } catch (err) {
      throw new Error(err);
    }
  }
}
