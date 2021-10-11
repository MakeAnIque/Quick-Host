export class SignupCustomUserData {
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  constructor(
    public isEmailVerified = false,
    public isLoginWithThirdParty = false,
    public passwordRequired = true,
    public emailVerificationRequired = true,
    public createDate = new Date().toISOString(),
    public modifiedDate = new Date().toISOString()
  ) {}

  set setEmail(email: string) {
    this.email = email;
  }

  set setPassword(password: string) {
    this.password = password;
  }

  set setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  set setLastName(lastName: string) {
    this.lastName = lastName;
  }
}
