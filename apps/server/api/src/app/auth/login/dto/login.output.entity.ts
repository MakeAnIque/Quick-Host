import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModelObjectType {
  @Field(() => String)
  email?: string;

  // @Field(() => String, { nullable: true })
  // firstName: string | null;

  // @Field(() => String, { nullable: true })
  // lastName: string | null;

  @Field(() => String)
  token?: string;

  // @Field(() => String, { nullable: true })
  // message: string | null;
}
