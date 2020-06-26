import {IsNotEmpty, IsNumber, MinLength} from 'class-validator';
import {Speciality} from '../entities';
import {LocalTime} from "@js-joda/core";

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
  specialityId?: number;
}

export class TestAddModel {
  @IsNotEmpty()
  @MinLength(3)
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
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  speciality: Speciality;

  get body(): TestAddBodyModel {
    const startDate = new Date(this.day); startDate.setHours(this.startHour.hour(), this.startHour.minute());
    const endDate = new Date(this.day); endDate.setHours(this.endHour.hour(), this.endHour.minute());
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
    if(!this.speciality){
      return {};
    }
    return {
      specialityId: this.speciality?.id
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
