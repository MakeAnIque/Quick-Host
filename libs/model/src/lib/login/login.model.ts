import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoginInstanceVariableType } from '@quick-host/interfaces';
import { Expose } from 'class-transformer';

export class LoginModel {
  @IsOptional()
  @IsString()
  username?: LoginInstanceVariableType;

  @IsOptional()
  @IsString()
  email?: LoginInstanceVariableType;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @Expose()
  public getUsername(): LoginInstanceVariableType {
    return this.username;
  }

  @Expose()
  public getEmail(): LoginInstanceVariableType {
    return this.email;
  }

  @Expose()
  public getPassword(): LoginInstanceVariableType {
    return this.password;
  }

  @Expose()
  public setUsername(username: string) {
    this.username = username;
  }

  @Expose()
  public setEmail(email: string) {
    this.email = email;
  }

  @Expose()
  public setPassword(password: string) {
    this.password = password;
  }
}
