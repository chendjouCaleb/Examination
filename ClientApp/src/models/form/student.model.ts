import {IsAlpha, IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from "class-validator";
import {Group, Speciality} from "../entities";

export interface StudentAddBody {
  registrationId: number;
  fullName: string;
  birthDate: Date;
  gender: string;
}

export interface StudentAddParams {
  specialityId?: number;
}

export class StudentAddModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: number;

  @IsNotEmpty()

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
    if(!this.speciality) {
      return {};
    }
    return {
      specialityId: this.speciality?.id
    }
  }
}


export class StudentInfoModel {
  @IsNotEmpty()
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
