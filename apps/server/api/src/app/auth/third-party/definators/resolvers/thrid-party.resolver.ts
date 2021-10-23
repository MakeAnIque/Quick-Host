import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { LoginModelObjectType } from '../../../login';

import { Auth0InputModelType } from '../../dto/auth0.input.entity';
import { ThirdPartyAuthPipeline } from '../../pipeline/third-party.pipeline';

@Resolver()
export class ThirdPartyResolver {
  constructor(
    private readonly thirdPartyAuthPipeline: ThirdPartyAuthPipeline
  ) {}

  @Query(() => String)
  async _() {
    return '';
  }

  @Mutation(() => LoginModelObjectType, { nullable: true })
  async auth0LoginProcess(@Args('auth0Dto') auth0Dto: Auth0InputModelType) {
    const pipelineData: any = await this.thirdPartyAuthPipeline
      .createObservablesEmit(auth0Dto)
      .initializePipeline();

    return pipelineData.loginOutputModel;
  }
}
