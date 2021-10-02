import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseAccordingToPrefixType } from '@quick-host/utils';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  public verifyToken() {}
  public async signPayloadObject<T extends object>(
    payloadObject: T
  ): Promise<string> {
    return sign(
      payloadObject,
      this.configService.get<string>(
        parseAccordingToPrefixType('env.JWT_SECRET')
      )
    );
  }
}
