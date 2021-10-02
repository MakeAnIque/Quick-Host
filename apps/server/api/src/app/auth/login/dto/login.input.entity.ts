import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginModelInputType {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly password?: string;
}
