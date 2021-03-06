/*********************************
 * NOTE: Global Module are Exported.
 */

import { GraphQLModule } from '@nestjs/graphql';
import { LoginModule, SignupModule } from '../auth';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  getEnvironmentFilePath,
  parseAccordingToPrefixType,
} from '@quick-host/utils';
import { environment } from '../../environments/environment';
import { ThirdPartyAuthModule } from '../auth/index';

export const modules = [
  GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    context: ({ req, res }) => ({ req, res }),
    formatError: (err) => {
      return err;
    },
  }),

  ConfigModule.forRoot({
    envFilePath: getEnvironmentFilePath(environment.environmentFilePrefix),
    load: [], // load Configs
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>(parseAccordingToPrefixType('env.DB_URI')),
      pass: configService.get<string>(
        parseAccordingToPrefixType('env.DB_USER')
      ),
      user: configService.get<string>(
        parseAccordingToPrefixType('env.DB_PASS')
      ),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    inject: [ConfigService],
  }),
  LoginModule,
  SignupModule,
  ThirdPartyAuthModule,
];
