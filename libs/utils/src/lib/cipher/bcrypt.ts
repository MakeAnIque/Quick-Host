import { compare, hash } from 'bcrypt';

/********************************
 * password matching
 */
export async function compareBcryptPassword(
  plainPassword: string,
  hashPassword: string
): Promise<boolean> {
  try {
    return await compare(plainPassword, hashPassword);
  } catch (err) {
    return false;
  }
}
/********************************
 * Password Hashing
 */
export async function hashPassword(
  plainPassword: string,
  saltRounds: number
): Promise<string> {
  try {
    return await hash(plainPassword, saltRounds);
  } catch (err) {
    throw new Error('Error in Hashing Password.');
  }
}
