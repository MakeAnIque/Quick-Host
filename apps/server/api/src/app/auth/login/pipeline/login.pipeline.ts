import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Injectable } from '@nestjs/common';

import { thrownExceptionIdentifier } from '@quick-host/utils';
import {
  PipelineDataflowControl,
  pipelineDataflowControl,
} from '../dto/factory-class/pipeline.factory.class';
import { LoginService } from '../service/login.service';
import { LoginPipelineMapper } from './pipeline.mapper';

@Injectable()
export class LoginPipeline extends LoginPipelineMapper {
  private observables$;
  private dataTransferObject;

  /**
   * all are injection injectable
   * @param loginRepository
   */
  constructor(public readonly loginService: LoginService) {
    super(loginService);
  }

  createObservablesEmit<T>(data: T): LoginPipeline {
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
          switchMap(
            (data: T): Promise<PipelineDataflowControl> =>
              this.loginValidate(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.loginQueryBuilder(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.loginAuthenticateUser(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.loginBuildJwtToken(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.loginConstructOutputObject(data, pipelineDataflowControl)
          ),

          catchError((error) => of(error))
        )
        .subscribe((data) => {
          /********************************
           * Error handling According to Exception thrown.
           * finable in Error generated class Thrown function.
           */
          if (thrownExceptionIdentifier(data)) return reject(data);

          return resolve(data);
        });
    });
  }
}
