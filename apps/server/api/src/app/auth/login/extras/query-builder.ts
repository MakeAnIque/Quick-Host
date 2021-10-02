export async function loginQueryBuilder(loginDto) {
  return { email: loginDto.email };
}
