/********************************
 * Note: this login Factory Class Used for both
 * Integrated Login System or Sign Up System
 */

export class CredentialFactory {
  constructor(
    public email?: string,
    public firstName?: string,
    public middleName?: string | null,
    public lastName?: string,
    public profilePicture?: string | null,
    public accessToken?: string | null,
    public refreshToken?: string | null,
    public isLoginWithThirdParty?: boolean,
    public passwordRequired?: boolean,
    public emailVerificationRequired?: boolean
  ) {}
}

/********************************
 * Note: used for make Common Class for Integrated System
 * Token Verification
 */
