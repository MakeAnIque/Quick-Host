import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

export const DecodeToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);

    console.log(context.getContext());
    // const request = ctx.switchToHttp().getRequest();

    // const bearerToken = request.headers['authorization'];
    // const token = bearerToken.split(' ')[1];

    // const decodedToken = decode(token);

    // if (!decodedToken) throw 'Invalid Token Found.';

    // return decodedToken;
  }
);
