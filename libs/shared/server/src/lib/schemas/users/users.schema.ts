import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  save() {
    throw new Error('Method not implemented.');
  }
  @Prop({ type: String })
  role: string | null;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
  })
  password: string;

  @Prop({
    type: Boolean,
  })
  isEmailVerified: boolean;

  @Prop({
    type: String,
  })
  profilePicture: string | null;

  @Prop({
    type: String,
  })
  accessToken: string | null;

  @Prop({
    type: String,
  })
  refreshToken: string | null;

  @Prop({
    type: Boolean,
  })
  isLoginWithThirdParty: boolean | null;

  @Prop({
    type: Boolean,
  })
  passwordRequired: boolean | null;

  @Prop({
    type: Boolean,
  })
  emailVerificationRequired: boolean | null;

  @Prop({ type: Number })
  saltRounds: number | null;

  @Prop({ type: Date })
  createDate: Date;

  @Prop({ type: Date })
  modifiedDate: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.virtual('userId').get(function () {
  return this._id;
});

UsersSchema.set('toObject', { virtuals: true });
