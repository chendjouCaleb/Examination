import {IsNotEmpty, IsNumber} from 'class-validator';
import {Course, ExaminationDepartment, ExaminationLevel} from '../entities';
import {LocalTime} from '@js-joda/core';

export interface TestAddBodyModel {
  coefficient: number;
  useAnonymity: boolean;
  radical: number;

  expectedStartDate: Date;
  expectedEndDate: Date;
}

export interface TestEditBodyModel {
  coefficient: number;
  useAnonymity: boolean;
}

export interface TestEditDateBody {
  expectedStartDate: Date;
  expectedEndDate: Date;
}

export interface TestAddParams {
  courseId: number,
  examinationLevelId: number;
}

export class TestAddModel {
  @IsNotEmpty()
  @IsNumber()
  coefficient: number;

  @IsNotEmpty()
  @IsNumber()
  radical: number;

  useAnonymity: boolean;

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  @IsNotEmpty()
  course: Course;

  @IsNotEmpty()
  examinationLevel: ExaminationLevel;

  examinationDepartment: ExaminationDepartment;

  get body(): TestAddBodyModel {
    const startDate = new Date(this.day);
    startDate.setHours(this.startHour.hour(), this.startHour.minute());
    const endDate = new Date(this.day);
    endDate.setHours(this.endHour.hour(), this.endHour.minute());
    return {
      coefficient: this.coefficient,
      radical: this.radical,
      useAnonymity: this.useAnonymity,

      expectedStartDate: startDate,
      expectedEndDate: endDate
    };
  }

  get params(): TestAddParams {
    return {
      examinationLevelId: this.examinationLevel.id,
      courseId: this.course.id
    };
  }
}

export class TestEditModel {
  useAnonymity: boolean;

  @IsNotEmpty()
  @IsNumber()
  coefficient: number;

  get body(): TestEditBodyModel {
    return {
      useAnonymity: this.useAnonymity,
      coefficient: this.coefficient
    };
  }

}

export class TestEditDateModel {
  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  get body(): TestEditDateBody {
    const startDate = new Date(this.day);
    startDate.setHours(this.startHour.hour(), this.startHour.minute());

    const endDate = new Date(this.day);
    endDate.setHours(this.endHour.hour(), this.endHour.minute());
    return {
      expectedStartDate: startDate,
      expectedEndDate: endDate
    };
  }
}
