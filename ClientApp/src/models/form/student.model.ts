import {IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from 'class-validator';
import {Level, LevelSpeciality} from 'examination/entities';

export interface StudentAddBody {
  registrationId: number;
  fullName: string;
  birthDate: Date;
  gender: string;
}

export interface StudentAddParams {
  levelId?: number;
  levelSpecialityId?: number;
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
  @IsIn(['F', 'M', 'f', 'm'])
  gender: string;

  @IsNotEmpty()
  level: Level;

  levelSpeciality: LevelSpeciality;


  get body(): StudentAddBody {
    return {
      fullName: this.fullName,
      birthDate: this.birthDate,
      gender: this.gender,
      registrationId: this.registrationId
    };
  }

  get params(): StudentAddParams {
    const params: StudentAddParams = {levelId: this.level.id};
    if (this.levelSpeciality) {
      params.levelSpecialityId = this.levelSpeciality.id;
    }
    return params;
  }
}


export class StudentInfoModel {
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  @IsIn(['F', 'M', 'f', 'm'])
  gender: string;
}


export class StudentRegistrationIdModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: string;
}
