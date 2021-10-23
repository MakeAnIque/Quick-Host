/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
// import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as fs from 'fs';

async function bootstrap() {
  // let httpsOptions = {};
  // if (process.env.ENV_TYPE !== 'development') {
  // let httpsOptions = {};

  // if (process.env.ENV_NODE !== 'development') {
  //   httpsOptions = {
  //     key: fs.readFileSync(__dirname + '/assets/key.pem'),
  //     cert: fs.readFileSync(__dirname + '/assets/certificate.pem'),
  //   };
  // }

  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.use(helmet());
  // app.use(csurf());
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
