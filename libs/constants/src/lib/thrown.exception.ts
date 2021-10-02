import { ValidationException } from '@quick-host/model';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export const thrownExceptionsClass = [
  ValidationException,
  UnauthorizedException,
  BadRequestException,
  Error,
];
