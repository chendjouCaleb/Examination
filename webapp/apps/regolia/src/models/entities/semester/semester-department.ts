import {Semester} from "./semester";
import {Department} from "../organisation";
import {Entity} from "../entity";
import {SemesterLevel} from "./semester-level";
import {SemesterSpeciality} from "./semester-speciality";
import {YearDepartment} from "../year";

export class SemesterDepartment extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.semesterId = value.semesterId;
    this.yearDepartmentId = value.yearDepartmentId;
  }

  yearDepartmentId: number;
  yearDepartment: YearDepartment;

  semester: Semester;
  semesterId: number;

  semesterLevels: SemesterLevel[];
  semesterSpecialities: SemesterSpeciality[];

  url(path?: string): string {
    const url = `${this.semester.url()}/departments/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
