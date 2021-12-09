import {Entity} from "../entity";
import {School} from "../organisation";
import {SemesterDepartment} from "./semester-department";
import {Year} from "../year";

export class Semester extends Entity<number>{
  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  year: Year;
  yearId: number;

  index: number;

  semesterDepartments: SemesterDepartment[] = [];

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;

    this.expectedStartDate = value.expectedStartDate ? new Date(value.expectedStartDate) : null;
    this.expectedEndDate = value.expectedEndDate ? new Date(value.expectedEndDate) : null;

    this.yearId = value.yearId;

    this.index = value.index;
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
    const url = `${this.year.url()}/semesters/${this.id}`;
    if(path) {
      return `${url}/${path}`;
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

  range(): string {
    return `${this.displayStartDate().getFullYear()}-${this.displayEndDate().getFullYear()}`;
  }
}
