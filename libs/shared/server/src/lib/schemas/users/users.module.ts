import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';

const modules = [
  MongooseModule.forFeature([
    {
      name: Users.name,
      schema: UsersSchema,
    },
  ]),
];

@Module({
  imports: [...modules],

  exports: [...modules],
})
export class UsersSchemaModule {}
