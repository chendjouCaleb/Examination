import {IsAlphanumeric, IsIn, IsNotEmpty, MinLength} from 'class-validator';
import {Level, LevelSpeciality} from 'examination/entities';
import moment from 'moment';

export interface StudentAddBody {
  registrationId: string;
  fullName: string;
  birthDate: string;
  birthPlace: string;
  gender: string;

  phoneNumber: string;
  email: string;
  address: string;
  image: Blob;
}

export interface StudentAddParams {
  levelId?: number;
  levelSpecialityId?: number;
}

export class StudentAddModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: string;

  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsNotEmpty()
  birthDate: Date;

  birthPlace: string;

  @IsNotEmpty()
  @IsIn(['F', 'M', 'f', 'm'])
  gender: string;

  @IsNotEmpty()
  level: Level;

  levelSpeciality: LevelSpeciality;

  phoneNumber: string;
  email: string;
  address: string;

  imageBlob: Blob;
  imageUrl: string;

  get genderString(): string {
    if (this.gender === 'f' || this.gender === 'F') {
      return 'Féminin';
    }

    if (this.gender === 'm' || this.gender === 'M') {
      return 'Masculin';
    }
    return null;
  }


  get body(): StudentAddBody {
    return {
      fullName: this.fullName,
      birthDate: moment(this.birthDate).format('YYYY-MM-DD'),
      birthPlace: this.birthPlace,
      gender: this.gender,
      registrationId: this.registrationId,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address,
      image: this.imageBlob
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
  birthPlace: string;

  @IsNotEmpty()
  @IsIn(['F', 'M', 'f', 'm'])
  gender: string;
}

export class StudentContactModel {
  phoneNumber: string;
  email: string;
  address: string;
}


export class StudentRegistrationIdModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  registrationId: string;
}
