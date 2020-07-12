import {IsNotEmpty} from 'class-validator';
import {LocalTime} from "@js-joda/core";

export interface PaperPeriodBodyModel {
  startDate: Date;
  endDate: Date;
}

export class PaperPeriodModel {
  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  get body(): PaperPeriodBodyModel {
    const startDate = new Date(this.day);
    startDate.setHours(this.startHour.hour(), this.startHour.minute());
    const endDate = new Date(this.day);
    endDate.setHours(this.endHour.hour(), this.endHour.minute());
    return {
      startDate: startDate,
      endDate: endDate
    };
  }
}

export class PaperReportModel {
  comment: string;

  anonymity: string;
}
