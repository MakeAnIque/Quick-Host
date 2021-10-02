import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { CredentialFactory } from '../cred-factory/credential-class.factory';
import { FacebookResponse } from '../interfaces/facebook.interface';

export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: '966012983963073',
      clientSecret: '18f35ba035dc9e87b428dee18041c614',
      callbackURL: 'https://localhost:3333/api/auth/facebook/redirect',
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
