import { SALT_ROUNDS } from '@quick-host/constants';
import { hashPassword } from '@quick-host/utils';
import { SignupModelInputType } from '../dto';
import { SignupCustomUserData } from '../dto/factory-class/user.custom.class';

export async function signupQueryBuilder(signupDto) {
  return {
    email: signupDto.email,
  };
}

export async function mergeUserCustomObject(
  signupUserData: SignupModelInputType
) {
  const { email, password, firstName, lastName } = signupUserData;

  const signupData = new SignupCustomUserData();

  const hashedPassword = await hashPassword(password, SALT_ROUNDS);

  signupData.setEmail = email;
  signupData.setPassword = hashedPassword;
  signupData.firstName = firstName;
  signupData.lastName = lastName;

  return signupData;
}
