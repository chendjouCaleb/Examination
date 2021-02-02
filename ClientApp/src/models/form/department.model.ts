import {IsAlpha, IsAlphanumeric, IsNotEmpty, MinLength} from 'class-validator';
import {User} from 'examination/entities';

export interface DepartmentAddModelBody {
  name: string;
  acronym: string;
  userId: string;
  address: string
}

export class DepartmentAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  acronym: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @MinLength(3)
  address: string;

  get body(): DepartmentAddModelBody {
    return {
      address: this.address,
      acronym: this.acronym,
      userId: this.user.id,
      name: this.name
    };
  }
}


export class DepartmentEditModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;


  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsAlpha()
  acronym;
}


