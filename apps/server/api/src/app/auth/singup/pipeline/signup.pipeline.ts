import { Injectable } from '@nestjs/common';
import { thrownExceptionIdentifier } from '@quick-host/utils';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from '../../login';
import {
  pipelineDataflowControl,
  PipelineDataflowControl,
} from '../dto/factory-class/pipeline.factory.class';
import { SignupService } from '../services/signup.service';
import { SignupPipelineMapper } from './pipeline.mapper';

@Injectable()
export class SignupPipeline extends SignupPipelineMapper {
  private observables$;
  private dataTransferObject;

  /**
   * all are injection injectable
   * @param loginRepository
   */
  constructor(
    public readonly signupService: SignupService,
    public readonly loginService: LoginService
  ) {
    super(signupService, loginService);
  }

  createObservablesEmit<T>(data: T): SignupPipeline {
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
              this.signupValidate(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.signupQueryBuilder(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.signupExtractUser(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.signupExtendsUserAdditionalDataObject(
              data,
              pipelineDataflowControl
            )
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.signupCreateUser(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.signupShapeToLoginFlowControl(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.loginBuildJwtToken(data, pipelineDataflowControl)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.loginConstructOutputObject(data, pipelineDataflowControl)
          ),

          //   switchMap((data: PipelineDataflowControl) => )

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
