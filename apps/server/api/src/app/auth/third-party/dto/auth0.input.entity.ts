import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Auth0InputModelType {
  @Field()
  token: string;

  @Field()
  accessToken: string;
}
