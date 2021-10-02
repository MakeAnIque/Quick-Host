export interface IRead<T> {
  find(query: T): Promise<T[]>;

  findOne(query: T): Promise<T>;
}
