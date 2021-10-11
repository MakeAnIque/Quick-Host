import { BadRequestException } from '@nestjs/common';
import { PipelineDataflowControl } from '../dto/factory-class';
import { LoginModelInputType } from '../dto/login.input.entity';
import { OutputClass } from '../dto/login.output.entity';
import { LoginValidate } from '../extras/login-validate';
import { loginQueryBuilder } from '../extras/query-builder';
import { LoginService } from '../service/login.service';

export class LoginPipelineMapper {
  constructor(public readonly loginService: LoginService) {}
  /**
   * validation of data
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async loginValidate(
    inputData,
    pipelineDataflowControl: PipelineDataflowControl
  ): Promise<PipelineDataflowControl> {
    const validationFlag = new LoginValidate(
      inputData,
      LoginModelInputType
    ).validate();

    if (validationFlag) {
      throw new BadRequestException(inputData);
    }
    // return new PipelineDataflowControl(inputData);

    pipelineDataflowControl.loginOriginalData = inputData;

    return pipelineDataflowControl;
  }

  /**
   * query building fot getting from database
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async loginQueryBuilder(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    try {
      const { loginOriginalData } =
        (await inputData) as PipelineDataflowControl as unknown as {
          loginOriginalData;
        };

      const queryData = await loginQueryBuilder(loginOriginalData);

      inputData.loginQueryData = queryData;

      return pipelineDataflowControl;
    } catch (err) {
      throw new Error('Error in Query Building.');
    }
  }

  /**
   * check User Exists
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async loginAuthenticateUser(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ): Promise<PipelineDataflowControl> {
    const { loginOriginalData, loginQueryData } =
      (await inputData) as PipelineDataflowControl as unknown as {
        loginOriginalData;
        loginQueryData;
      };
    const user = await this.loginService.authenticateUser(inputData);

    // return new PipelineDataflowControl(loginOriginalData, loginQueryData, user);

    pipelineDataflowControl.loginUserData = user;

    return pipelineDataflowControl;
  }

  /****************************************************************
   *
   * Build accessToken
   * */

  public async loginBuildJwtToken(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    const { loginUserData } =
      (await inputData) as PipelineDataflowControl as unknown as {
        loginOriginalData;
        loginQueryData;
        loginUserData;
      };

    const token = await this.loginService.buildJwtToken(loginUserData);

    pipelineDataflowControl.loginJwtToken = token;

    return pipelineDataflowControl;
  }

  /********************************
   * NOTE: Optional According to come API features
   */
  public async loginConstructOutputObject(
    inputData,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    const { loginUserData, loginJwtToken } =
      (await inputData) as PipelineDataflowControl as unknown as {
        loginUserData;
        loginJwtToken;
      };
    const { email, firstName, lastName, isEmailVerified } = loginUserData;

    const outputClass = new OutputClass(
      email,
      loginJwtToken.toString(),
      firstName,
      lastName,
      isEmailVerified
    );

    pipelineDataflowControl.loginOutputModel = outputClass;
    return pipelineDataflowControl;
  }
}
