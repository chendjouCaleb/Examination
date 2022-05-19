import {IsAlphanumeric, IsEmail, IsIn, IsNotEmpty, Length, Matches, MinLength} from "class-validator";
import {IsFuture, IsLoginId, IsName, MatchField} from "@examination/models/validators";

export class UserAddModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsName()
  firstName: string;

  @IsName()
  lastName: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  passwordMatch: string;
}


export class LoginModel {
  @IsNotEmpty()
  @IsLoginId()
  id: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  isPersisted: boolean;
}


export class ChangePasswordModel {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @MatchField('newPassword')
  newPasswordMatch: string
}


export class ResetPasswordModel {
  email: string;
  code: string;
  password: string;
}

export class VerifyResetPasswordToken {
  email: string;
  token: string;
}


export class UserInfoModel {
  constructor(value?: any) {
    if (value) {
      this.firstName = value.firstName;
      this.firstName = value.firstName;
      this.gender = value.gender;
      this.birthDate = value.birthDate;
    }
  }

  @IsName()
  firstName: string;

  @IsName()
  lastName: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  birthDate: Date;
}
