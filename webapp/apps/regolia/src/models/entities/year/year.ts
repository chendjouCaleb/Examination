import {Entity} from "../entity";
import {School} from "../organisation";
import {YearDepartment} from "./year-department";
import {Semester} from "../semester";

export class Year extends Entity<number>{
  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  school: School;
  schoolId: number;

  yearDepartments: YearDepartment[] = [];
  semesters: Semester[];

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

  get isWaiting() :boolean {
    return !this.startDate;
  }

  get isOpen(): boolean {
    return this.startDate && !this.endDate;
  }

  get isClosed(): boolean {
    return !!this.startDate && !!this.endDate;
  }

  get state(): string {
    if(this.isWaiting) {
      return 'waiting'
    }
    if(this.isOpen) {
      return 'progress';
    }
    return 'ended';
  }

  url(path?: string): string {
    const url = `${this.school.url}/years/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }

  displayStartDate(): Date {
    if(this.startDate) {
      return this.startDate;
    }
    return this.expectedStartDate;
  }

  displayEndDate(): Date {
    if(this.endDate) {
      return this.endDate;
    }
    return this.expectedEndDate;
  }

  rangeYears(): string {
    return `${this.displayStartDate().getFullYear()}-${this.displayEndDate().getFullYear()}`;
  }
}
