import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor() {}
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }
}
