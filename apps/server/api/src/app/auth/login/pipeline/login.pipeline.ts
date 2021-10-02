import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Injectable } from '@nestjs/common';

import { thrownExceptionIdentifier } from '@quick-host/utils';
import { PipelineDataflowControl } from '../dto/factory-class/pipeline.factory.class';
import { LoginService } from '../service/login.service';
import { PipelineMapper } from './pipeline.mapper';

@Injectable()
export class LoginPipeline extends PipelineMapper {
  private observables$;
  private dataTransferObject;

  /**
   * all are injection injectable
   * @param loginRepository
   */
  constructor(protected readonly loginService: LoginService) {
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
    return new Promise((resolve: Function, reject: Function): void => {
      this.observables$
        .pipe(
          switchMap(
            (data: T): Promise<PipelineDataflowControl> => this.validate(data)
          ),
          switchMap((data: PipelineDataflowControl) => this.queryBuilder(data)),
          switchMap((data: PipelineDataflowControl) =>
            this.authenticateUser(data)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.buildJwtToken(data)
          ),
          switchMap((data: PipelineDataflowControl) =>
            this.constructOutputObject(data)
          ),
          catchError((error) => of(error))
        )
        .subscribe((data): Function => {
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
