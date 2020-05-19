import {IsAlpha, IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from "class-validator";
import {Group, Speciality} from "../entities";


export class StudentAddModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: number;

  @IsNotEmpty()
  @IsAlpha("fr-FR")
  @MinLength(3)
  fullName: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  @IsIn(["F", "M", 'f', 'm'])
  gender: string;

  group: Group;

  speciality: Speciality;
}


export class StudentInfoModel {
  @IsNotEmpty()
  @IsAlpha("fr-FR")
  @MinLength(3)
  fullName: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  @IsIn(["F", "M", 'f', 'm'])
  gender: string;

  group: Group;

  speciality: Speciality;
}


export class RegistrationIdModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: string;
}
