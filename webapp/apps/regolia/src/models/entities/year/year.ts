import {Entity} from "../entity";
import {School} from "../organisation";
import {YearDepartment} from "./year-department";

export class Year extends Entity<number>{
  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  school: School;
  schoolId: number;

  yearDepartments: YearDepartment[] = [];

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;

    this.expectedStartDate = value.expectedStartDate ? new Date(value.expectedStartDate) : null;
    this.expectedEndDate = value.expectedEndDate ? new Date(value.expectedEndDate) : null;

    this.schoolId = value.schoolId;
  }


  get isOpen(): boolean {
    return this.startDate && !this.endDate;
  }

  get isClosed(): boolean {
    return !!this.startDate && !!this.endDate;
  }
}
