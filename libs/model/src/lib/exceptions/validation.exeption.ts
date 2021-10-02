export class ValidationException<T> {
  constructor(
    public data: T,
    public message: string = 'Validation Failed.',
    public statusCode: number = 400,
    public status: boolean = false
  ) {}
}
