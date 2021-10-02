export interface IWrite<T> {
  create(options: T): Promise<T>;
  update(options: T): Promise<T>;
  delete(options: T): Promise<T>;
}
