import {Entity} from "../entity";
import {YearTeacher} from "../year";

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

  semesterDepartment: SemesterTeacher;
  semesterDepartmentId: number;

  isNew: boolean = false;
}
