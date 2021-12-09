import {Entity} from "../entity";
import {YearDepartment} from "./year-department";
import {Teacher} from "../member";

export class YearTeacher extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearDepartmentId = value.yearDepartmentId;
    this.teacherId = value.teacherId;

    if(value.teacher) {
      this.teacher = new Teacher(value.teacher);
    }
  }

  yearDepartmentId: number;
  yearDepartment: YearDepartment;

  teacher: Teacher;
  teacherId: number;

  url(path?: string): string {
    const url = `${this.yearDepartment?.url()}/teachers/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
