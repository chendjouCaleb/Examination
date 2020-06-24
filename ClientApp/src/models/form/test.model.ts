import {IsNotEmpty, IsNumber} from 'class-validator';
import {Speciality} from '../entities';

export interface TestAddBodyModel {
  name: string;
  code: string;
  radical: number;
  coefficient: number;
  useAnonymity: boolean;

  expectedStartDate: Date;
  expectedEndDate: Date;
}

export interface TestAddParams {
  specialityId: number;
}

export class TestAddModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  radical: number;

  @IsNotEmpty()
  @IsNumber()
  coefficient: number;


  useAnonymity: boolean = false;

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: string;

  @IsNotEmpty()
  endHour: string;

  speciality: Speciality;

  get body(): TestAddBodyModel {
    const startHour = this.startHour.replace(" ", "").split(":");
    const endHour = this.endHour.replace(" ", "").split(":");

    const startDate = new Date(this.day); startDate.setHours(+startHour[0], +startHour[1]);
    const endDate = new Date(this.day); endDate.setHours(+endHour[0], +endHour[1]);
    return {
      name: this.name,
      code: this.code,
      radical: this.radical,
      coefficient: this.coefficient,
      useAnonymity: this.useAnonymity,

      expectedStartDate: startDate,
      expectedEndDate: endDate
    };
  }

  get params(): TestAddParams {
    return {
      specialityId: this.speciality.id
    }
  }
}

export class TestEditForm {
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

}
