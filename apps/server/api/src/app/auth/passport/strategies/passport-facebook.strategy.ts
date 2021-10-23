import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { parseAccordingToPrefixType } from '@quick-host/utils';
import { Strategy } from 'passport-facebook';
import { CredentialFactory } from '../cred-factory/credential-class.factory';
import { FacebookResponse } from '../interfaces/facebook.interface';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>(
        parseAccordingToPrefixType('env.FACEBOOK_CLIENT_ID')
      ),
      clientSecret: configService.get<string>(
        parseAccordingToPrefixType('env.FACEBOOK_CLIENT_SECRET')
      ),
      callbackURL: configService.get<string>(
        parseAccordingToPrefixType('env.FACEBOOK_CALLBACK_URL')
      ),
      scope: ['email'],
      profileFields: ['id', 'name', 'displayName', 'photos', 'email', 'gender'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: FacebookResponse
  ): Promise<any> {
    /********************************
     * Construct Named Factory
     */

    const credentialFactory = new CredentialFactory(
      (profile.emails[0] || {}).value,
      profile.name.givenName,
      profile.name.middleName,
      profile.name.familyName,
      profile.photos[0].value,
      accessToken,
      refreshToken,
      true,
      false,
      false
    );

    return credentialFactory;
  }
}
