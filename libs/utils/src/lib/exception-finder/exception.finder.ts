import { thrownExceptionsClass } from '@quick-host/constants';

export function thrownExceptionIdentifier<T>(exception: T) {
  return thrownExceptionsClass.find(
    (exceptionClass) => exception instanceof exceptionClass
  );
}
