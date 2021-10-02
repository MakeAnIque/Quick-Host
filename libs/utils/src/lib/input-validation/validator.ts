import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export class ValidateInputSchema<T, E> {
  constructor(protected incomingObject: T, protected validationRefObject: E) {}

  public validate(): ValidationError[] | null {
    const toClassTransform: any = plainToClass(
      this.validationRefObject as unknown as ClassConstructor<unknown>,
      this.incomingObject
    );

    const validationErrorArray = validateSync(toClassTransform);

    if (validationErrorArray.length) {
      return validationErrorArray;
    }

    return null;
  }
}
