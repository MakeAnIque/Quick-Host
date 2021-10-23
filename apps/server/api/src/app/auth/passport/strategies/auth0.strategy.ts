import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class Auth0Guards implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const bearerToken = request.headers['authorization'];

      if (!bearerToken) throw 'No Token Found.';

      return request;
    } catch (err) {
      return false;
    }
  }
}
