import {IsNotEmpty, IsNumber} from 'class-validator';
import {Speciality} from '../entities';

export interface TestAddModel {
  name: string;
  code: string;
  radical: number;
  coefficient: boolean;
  useAnonymity: boolean;

  expectedStartDate: Date;
  expectedEndDate: Date;
}

export class TestAddForm {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  radical: number;

  @IsNotEmpty()
  @IsNumber()
  coefficient: boolean;


  useAnonymity: boolean = false;

  @IsNotEmpty()

  expectedStartDate: Date;

  @IsNotEmpty()
  expectedEndDate: Date;

  speciality: Speciality;

  get model(): TestAddModel {
    return {
      name: this.name,
      code: this.code,
      radical: this.radical,
      coefficient: this.coefficient,
      useAnonymity: this.useAnonymity,

      expectedStartDate: this.expectedStartDate,
      expectedEndDate: this.expectedEndDate,
    };
  }
}
