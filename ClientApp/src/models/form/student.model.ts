import {IsAlpha, IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from "class-validator";
import {Group, Speciality} from "../entities";

export interface StudentAddBody {
  registrationId: number;
  fullName: string;
  birthDate: Date;
  gender: string;
}

export interface StudentAddParams {
  groupId: number;

  specialityId: number;
}

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


  get body(): StudentAddBody {
    return {
      fullName: this.fullName,
      birthDate: this.birthDate,
      gender: this.gender,
      registrationId: this.registrationId
    }
  }

  get params(): StudentAddParams {
    return {
      groupId: this.group.id,
      specialityId: this.speciality.id
    }
  }
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
}


export class StudentRegistrationIdModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: string;
}
