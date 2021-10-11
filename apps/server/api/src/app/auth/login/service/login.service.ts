import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareBcryptPassword } from '@quick-host/utils';
import { Users } from '@quickhost/server';

import { PipelineDataflowControl } from '../dto/factory-class/pipeline.factory.class';
import { LoginRepository } from '../repository/login.repository';
import { JwtService } from '../../jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtService: JwtService
  ) {}

  public async authenticateUser(inputData): Promise<Users> | null {
    try {
      const { loginOriginalData, loginQueryData } =
        inputData as PipelineDataflowControl as unknown as {
          loginOriginalData;
          loginQueryData;
        };

      const user = await this.loginRepository.findOne(loginQueryData);

      const { password } = loginOriginalData;
      /********************************
       * user not exists
       */
      if (!user) {
        throw 'User Not Found.';
      }

      /****** check here for password validation otherwise skips */

      if (user.isLoginWithThirdParty) return user;

      if (!(await this.passwordMatch(password, user.password)))
        throw 'Password not matched.';

      return user;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  public async passwordMatch(password: string, hashPassword: string) {
    return await compareBcryptPassword(password, hashPassword);
  }

  /********************************
   * build jwt Token
   */
  public async buildJwtToken(userData): Promise<string> {
    /********************************
     * construct jwt Token Object Class
     */

    const { userId, email /** further add after class construct */ } = userData;

    try {
      return await this.jwtService.signPayloadObject<object>({
        userId,
        email,
      });
    } catch (err) {
      throw new Error('Error in Generating token.');
    }
  }
}
