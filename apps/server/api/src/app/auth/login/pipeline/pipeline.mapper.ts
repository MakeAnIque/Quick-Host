import { BadRequestException } from '@nestjs/common';
import { PipelineDataflowControl } from '../dto/factory-class';
import { LoginModelInputType } from '../dto/login.input.entity';
import { LoginValidate } from '../extras/login-validate';
import { loginQueryBuilder } from '../extras/query-builder';

import { LoginService } from '../service/login.service';

export class PipelineMapper {
  constructor(protected readonly loginService: LoginService) {}
  /**
   * validation of data
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async validate(inputData): Promise<PipelineDataflowControl> {
    const validationFlag = new LoginValidate(
      inputData,
      LoginModelInputType
    ).validate();

    if (!validationFlag) {
      throw new BadRequestException(inputData);
    }
    return new PipelineDataflowControl(inputData);
  }

  /**
   * query building fot getting from database
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async queryBuilder(inputData: PipelineDataflowControl) {
    try {
      const { originalData } =
        (await inputData) as PipelineDataflowControl as unknown as {
          originalData;
        };

      const queryData = await loginQueryBuilder(originalData);

      return new PipelineDataflowControl(originalData, queryData);
    } catch (err) {
      throw new Error('Error in Query Building.');
    }
  }

  /**
   * check User Exists
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async authenticateUser(
    inputData: PipelineDataflowControl
  ): Promise<PipelineDataflowControl> {
    const { originalData, queryData } =
      (await inputData) as PipelineDataflowControl as unknown as {
        originalData;
        queryData;
      };
    const user = await this.loginService.authenticateUser(inputData);

    return new PipelineDataflowControl(originalData, queryData, user);
  }

  /****************************************************************
   *
   * Build accessToken
   * */

  public async buildJwtToken(inputData: PipelineDataflowControl) {
    const { originalData, queryData, userData } =
      (await inputData) as PipelineDataflowControl as unknown as {
        originalData;
        queryData;
        userData;
      };

    const token = await this.loginService.buildJwtToken(userData);
    return new PipelineDataflowControl(
      originalData,
      queryData,
      userData,
      token
    );
  }

  /********************************
   * NOTE: Optional According to come API features
   */
  public async constructOutputObject(inputData) {
    const { userData, jwtToken } =
      (await inputData) as PipelineDataflowControl as unknown as {
        originalData;
        queryData;
        userData;
        jwtToken;
      };
    const { email } = userData;
    class OutputClass {
      constructor(public email: string, public token: string) {}
    }
    const outputClass = new OutputClass(email, jwtToken.toString());
    return outputClass;
  }
}
