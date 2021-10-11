import { Injectable } from '@nestjs/common';
import { Users } from '@quickhost/server';

import { SignupModelInputType } from '../dto';
import { SignupRepository } from '../repository/signup.repository';

@Injectable()
export class SignupService {
  constructor(private readonly signupRepository: SignupRepository) {}

  public async checkUserExists(queryData): Promise<boolean | Users> {
    try {
      const user = await this.signupRepository.getUser(queryData);

      if (user) {
        throw 'User Already Exists';
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async createUserAccount(userObject: SignupModelInputType) {
    try {
      const userAccount: any = await this.signupRepository.create(userObject);
      return await userAccount.save();
    } catch (err) {
      throw `${err}`;
    }
  }
}
