import {IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from "class-validator";
import { Speciality} from "../entities";

export interface ApplicationAddBody {
  registrationId: number;
  fullName: string;
  birthDate: Date;
  gender: string;
}

export interface ApplicationAddParams {
  specialityId?: number;
}

export class ApplicationAddModel {
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

  speciality: Speciality;


  get body(): ApplicationAddBody {
    return {
      fullName: this.fullName,
      birthDate: this.birthDate,
      gender: this.gender,
      registrationId: this.registrationId
    }
  }

  get params(): ApplicationAddParams {
    if(!this.speciality) {
      return {};
    }
    return {
      specialityId: this.speciality?.id
    }
  }
}


export class ApplicationInfoModel {
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  @IsIn(["F", "M", 'f', 'm'])
  gender: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: string;
}
