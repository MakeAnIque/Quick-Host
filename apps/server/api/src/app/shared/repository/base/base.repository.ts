import { Model } from 'mongoose';
import { IRead } from '../interfaces/iread.interface';
import { IWrite } from '../interfaces/iwrite.interface';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  constructor(public readonly model: Model<T>) {}

  async create(options: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async update(options: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async delete(options: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async find(query: T): Promise<T[]> {
    return await this.model.find(query).exec();
  }
  async findOne(query: T): Promise<T> {
    return await this.model.findOne(query).exec();
  }
}
