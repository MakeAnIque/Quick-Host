import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModelObjectType {
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

export class OutputClass {
  constructor(
    public email: string,
    public token: string,
    public firstName,
    public lastName,
    public isEmailVerified: boolean
  ) {}
}
