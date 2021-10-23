import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseAccordingToPrefixType } from '@quick-host/utils';
import { RedisClient, redis } from 'redis';
@Injectable()
export class RedisService {
  redisClient!: RedisClient;
  constructor(private readonly configService: ConfigService) {
    this.redisClient = redis.createClient(
      configService.get<string>(
        parseAccordingToPrefixType('env.REDIS_HOST_URL')
      ),
      +configService.get<number>(
        parseAccordingToPrefixType('env.REDIS_HOST_PORT')
      )
    );
  }
}
