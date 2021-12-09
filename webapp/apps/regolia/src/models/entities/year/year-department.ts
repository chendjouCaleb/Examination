import {Year} from "./year";
import {Department} from "../organisation";
import {Entity} from "../entity";
import {YearLevel} from "./year-level";
import {YearSpeciality} from "./year-speciality";
import {SemesterDepartment} from "../semester";
import {YearStudent} from "./year-student";
import {YearTeacher} from "./year-teacher";

export class YearDepartment extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearId = value.yearId;
    this.departmentId = value.departmentId;
    this.department = new Department(value.department);
  }

  yearId: number;
  year: Year;

  department: Department;
  departmentId: number;

  yearLevels: YearLevel[];
  yearSpecialities: YearSpeciality[];
  semesterDepartments: SemesterDepartment[];
  yearStudents: YearStudent[];
  yearTeachers: YearTeacher[];

  url(path?: string): string {
    const url = `${this.year.url()}/departments/${this.id}`;
    if(path) {
      return `${url}/${path}`;
    }
    return url;
  }
}
