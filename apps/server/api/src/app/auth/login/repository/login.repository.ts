import { BaseRepository } from '../../../shared';
import { Users, UsersDocument } from '@quickhost/server';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginRepository extends BaseRepository<Users> {
  constructor(
    @InjectModel(Users.name) protected readonly usersModel: Model<UsersDocument>
  ) {
    super(usersModel);
  }

  /****************************************************************
   * Get user detail
   */

  async getUser(query): Promise<Users | null> {
    try {
      const users = await this.findOne(query);
      return users;
    } catch (err) {
      throw null;
    }
  }
}
