import {IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from 'class-validator';
import {Department, Level, LevelSpeciality} from 'examination/entities';

export interface ApplicationAddBody {
  registrationId: number;
  fullName: string;
  birthDate: Date;
  gender: string;
}

export interface ApplicationAddParams {
  levelSpecialityId?: number;
  levelId?: number;
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

  department: Department;

  @IsNotEmpty()
  level: Level;

  levelSpeciality: LevelSpeciality;



  get body(): ApplicationAddBody {
    return {
      fullName: this.fullName,
      birthDate: this.birthDate,
      gender: this.gender,
      registrationId: this.registrationId
    }
  }

  get params(): ApplicationAddParams {
    const params: ApplicationAddParams = {
      levelId: this.level.id
    };

    if(this.levelSpeciality) {
      params.levelSpecialityId = this.levelSpeciality.id;
    }
    return  params;
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
