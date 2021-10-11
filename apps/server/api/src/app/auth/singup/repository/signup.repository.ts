import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared';
import { Users, UsersDocument } from '@quickhost/server';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SignupRepository extends BaseRepository<Users> {
  constructor(
    @InjectModel(Users.name) protected readonly userModel: Model<UsersDocument>
  ) {
    super(userModel);
  }

  /****************************************************************
   * Get user detail
   */

  public async getUser(query): Promise<Users | null> {
    try {
      const users = await this.findOne(query);
      return users;
    } catch (err) {
      throw null;
    }
  }

  /****************************************************************
   * Create User Account
   */

  public async createUserAccount(data) {
    try {
      const userAccount = await this.create(data);

      //   const t = await userAccount.save();

      console.log(userAccount);
    } catch (err) {
      throw null;
    }
  }
}
