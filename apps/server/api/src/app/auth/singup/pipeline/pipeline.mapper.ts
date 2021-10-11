import { BadRequestException } from '@nestjs/common';
import { LoginPipelineMapper, LoginService } from '../../login';
import { PipelineDataflowControl } from '../dto/factory-class';
import { SignupModelInputType } from '../dto/signup.input.entity';
import {
  signupQueryBuilder,
  mergeUserCustomObject,
} from '../extras/query.builder';
import { SignupValidate } from '../extras/signup.validate';
import { SignupService } from '../services/signup.service';

export class SignupPipelineMapper extends LoginPipelineMapper {
  constructor(
    public readonly signupService: SignupService,
    public readonly loginService: LoginService
  ) {
    super(loginService);
  }
  /**
   * validation of data
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async signupValidate(
    inputData,
    pipelineDataflowControl: PipelineDataflowControl
  ): Promise<PipelineDataflowControl> {
    const validation = new SignupValidate(
      inputData,
      SignupModelInputType
    ).validate();

    if (validation) {
      throw new BadRequestException(inputData);
    }

    pipelineDataflowControl.signupOriginalData = inputData;
    return pipelineDataflowControl;
  }

  /**
   * query building fot getting from database
   * @param inputData PipelineDataflowControl
   * @returns Promise based PipelineDataflowControl
   */
  public async signupQueryBuilder(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    try {
      const { signupOriginalData } =
        (await inputData) as PipelineDataflowControl as unknown as {
          signupOriginalData;
        };

      const queryData = await signupQueryBuilder(signupOriginalData);

      pipelineDataflowControl.signupQueryData = queryData;

      return pipelineDataflowControl;
    } catch (err) {
      throw new Error('Error in Query Building.');
    }
  }

  public async signupExtractUser(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    try {
      const { signupQueryData } =
        (await inputData) as PipelineDataflowControl as unknown as {
          signupQueryData;
        };

      const userData = await this.signupService.checkUserExists(
        signupQueryData
      );

      pipelineDataflowControl.signupUserData = userData;

      return pipelineDataflowControl;
    } catch (err) {
      throw new Error('User Already Exists.');
    }
  }

  public async signupExtendsUserAdditionalDataObject(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    try {
      const { signupOriginalData } =
        (await inputData) as PipelineDataflowControl as unknown as {
          signupOriginalData;
        };

      const combinedUserData = await mergeUserCustomObject(signupOriginalData);

      pipelineDataflowControl.signupUserObjectToSave = combinedUserData;

      return pipelineDataflowControl;
    } catch (err) {
      throw new Error('Error in Creating User Object');
    }
  }

  public async signupCreateUser(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    try {
      const { signupUserObjectToSave } =
        (await inputData) as PipelineDataflowControl as unknown as {
          signupUserObjectToSave;
        };

      const accountCreation = await this.signupService.createUserAccount(
        signupUserObjectToSave
      );

      pipelineDataflowControl.signupUserAccountCreated = accountCreation;

      return pipelineDataflowControl;
    } catch (err) {
      throw new Error('Error in creating User.');
    }
  }

  public async signupShapeToLoginFlowControl(
    inputData: PipelineDataflowControl,
    pipelineDataflowControl: PipelineDataflowControl
  ) {
    try {
      const { signupUserAccountCreated } =
        (await inputData) as PipelineDataflowControl as unknown as {
          signupUserAccountCreated;
        };

      pipelineDataflowControl.loginUserData = signupUserAccountCreated;

      return pipelineDataflowControl;
    } catch (err) {
      throw new Error('User Already Exists.');
    }
  }
}
