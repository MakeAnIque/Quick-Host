import { ValidationException } from '@quickhost/model';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export const thrownExceptionsClass = [
  ValidationException,
  UnauthorizedException,
  BadRequestException,
  Error,
];
