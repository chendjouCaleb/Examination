import {Level} from "../organisation";
import {Entity} from "../entity";
import {SemesterDepartment} from "./semester-department";
import {SemesterLevelSpeciality} from "./semester-level-speciality";
import {YearLevel} from "../year";

export class SemesterLevel extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearLevelId = value.yearLevelId;
    this.semesterDepartmentId = value.semesterDepartmentId;
  }

  semesterDepartmentId: number;
  semesterDepartment: SemesterDepartment;

  yearLevel: YearLevel;
  yearLevelId: number;

  semesterLevelSpecialities: SemesterLevelSpeciality[];

  url(path?: string): string {
    const url = `${this.semesterDepartment.url()}/levels/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
