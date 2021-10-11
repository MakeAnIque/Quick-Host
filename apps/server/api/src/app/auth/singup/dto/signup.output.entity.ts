import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignupModelObjectType {
  @Field(() => String)
  email?: string;

  @Field(() => String, { nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  lastName: string | null;

  @Field(() => Boolean, { nullable: true })
  isEmailVerified;

  @Field(() => String)
  token?: string;
}
