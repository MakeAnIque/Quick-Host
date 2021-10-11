import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignupModelInputType {
  @Field(() => String)
  @IsEmail()
  @IsString()
  readonly email: string;

  @Field(() => String)
  @IsString()
  @MaxLength(24)
  firstName: string;

  @Field(() => String)
  @IsString()
  @MaxLength(16)
  lastName: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  readonly password?: string;
}
