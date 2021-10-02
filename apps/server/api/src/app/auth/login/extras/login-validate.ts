import { ValidateInputSchema } from '@quick-host/utils';

export class LoginValidate<T, E> extends ValidateInputSchema<T, E> {
  constructor(protected incomingObject: T, protected validationRefObject: E) {
    super(incomingObject, validationRefObject);
  }
}
