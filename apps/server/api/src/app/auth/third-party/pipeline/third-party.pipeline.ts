import { Injectable } from '@nestjs/common';
import { thrownExceptionIdentifier } from '@quick-host/utils';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { LoginPipeline } from '../../login';
import { SignupPipeline } from '../../singup';
import { thirdPartyAuthPipelineDataFlow } from '../dto/factory-class/third-party.pipeline';

import { ThirdPartyAuthPipelineMapper } from './third-party.mapper';

@Injectable()
export class ThirdPartyAuthPipeline extends ThirdPartyAuthPipelineMapper {
  private observables$;
  private dataTransferObject;
  constructor(
    protected readonly loginPipeline: LoginPipeline,
    protected readonly signupPipeline: SignupPipeline
  ) {
    super(loginPipeline, signupPipeline);
  }

  createObservablesEmit<T>(data: T) {
    this.observables$ = new Observable((subscription) => {
      this.dataTransferObject = data;
      subscription.next(data);
    });
    return this;
  }

  public async initializePipeline<T>(): Promise<T> {
    return new Promise((resolve, reject): void => {
      this.observables$
        .pipe(
          switchMap((data: T) =>
            this.shapeToLoginProcess(data, thirdPartyAuthPipelineDataFlow)
          ),
          switchMap((data: T) =>
            this.initiateLoginProcess(data, thirdPartyAuthPipelineDataFlow)
          ),

          switchMap((data: T) =>
            this.shapeToSignupProcess(data, thirdPartyAuthPipelineDataFlow)
          ),
          // switchMap(
          //   (data: T): Promise<PipelineDataflowControl> =>
          //     this.loginValidate(data, pipelineDataflowControl)
          // ),
          // switchMap((data: PipelineDataflowControl) =>
          //   this.loginQueryBuilder(data, pipelineDataflowControl)
          // ),
          // switchMap((data: PipelineDataflowControl) =>
          //   this.loginAuthenticateUser(data, pipelineDataflowControl)
          // ),
          // switchMap((data: PipelineDataflowControl) =>
          //   this.loginBuildJwtToken(data, pipelineDataflowControl)
          // ),
          // switchMap((data: PipelineDataflowControl) =>
          //   this.loginConstructOutputObject(data, pipelineDataflowControl)
          // ),

          catchError((error) => of(error))
        )
        .subscribe((data) => {
          /********************************
           * Error handling According to Exception thrown.
           * finable in Error generated class Thrown function.
           */
          if (thrownExceptionIdentifier(data)) return reject(data);
          console.log(data);
          return resolve(data);
        });
    });
  }
}
