import {Entity} from "../entity";
import {YearTeacher} from "../year";
import {SemesterDepartment} from "./semester-department";

export class SemesterTeacher extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearTeacherId = value.yearTeacherId;
    this.semesterDepartmentId = value.semesterDepartmentId;

    if(value.yearTeacher) {
      this.yearTeacher = new YearTeacher(value.yearTeacher);
    }
  }

  yearTeacher: YearTeacher;
  yearTeacherId: number;

  semesterDepartment: SemesterDepartment;
  semesterDepartmentId: number;

  isNew: boolean = false;

  url(path?: string): string {
    const url = `${this.semesterDepartment?.url()}/teachers/${this.id}`;
    if(path) {
      return `${url}/${path}`;
    }
    return url;
  }
}
