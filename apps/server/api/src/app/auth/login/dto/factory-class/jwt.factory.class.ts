export class JwtFactoryClass {
  constructor(
    public userId: string,
    public email: string,
    public firstName?: string,
    public role?: string
  ) /****************************************************************
   * Further will attach According to flow
   */
  {}
}
