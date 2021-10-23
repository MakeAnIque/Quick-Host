import { LoginPipeline } from '../../login';
import { SignupPipeline } from '../../singup';
import { decode } from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

export class ThirdPartyAuthPipelineMapper {
  constructor(
    protected readonly loginPipeline: LoginPipeline,
    protected readonly signupPipeline: SignupPipeline
  ) {}

  public async shapeToLoginProcess(inputData, pipelineDataFlowObject) {
    const { token } = inputData;

    const decodedUser = decode(token) as any;

    const { email } = decodedUser;

    pipelineDataFlowObject.thirdPartyOriginalData = inputData;
    pipelineDataFlowObject.loginOriginalData = {
      email,
      password: '',
    };

    return pipelineDataFlowObject;
  }

  /********************************
   * initiate Login Process firstTime
   */

  public async initiateLoginProcess(inputData, pipelineDataFlowObject) {
    try {
      const { loginOriginalData } = inputData;

      return await this.loginPipeline
        .createObservablesEmit(loginOriginalData)
        .initializePipeline();
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return pipelineDataFlowObject;
      }
      throw err;
    }
  }

  /********************************
   * Initiate Signup Process
   */
  public async shapeToSignupProcess(inputData, pipelineDataFlowObject) {
    try {
    } catch (err) {}
  }
}
