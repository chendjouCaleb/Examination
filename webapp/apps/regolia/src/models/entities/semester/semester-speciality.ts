import {Semester} from "./semester";
import {Department, Speciality} from "../organisation";
import {Entity} from "../entity";
import {SemesterLevelSpeciality} from "./semester-level-speciality";
import {SemesterDepartment} from "./semester-department";
import {YearSpeciality} from "../year";

export class SemesterSpeciality extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.semesterDepartmentId = value.semesterDepartmentId;
    this.yearSpecialityId = value.yearSpecialityId;
  }

  yearSpecialityId: number;
  yearSpeciality: YearSpeciality;

  semesterDepartment: SemesterDepartment;
  semesterDepartmentId: number;

  semesterLevelSpecialities: SemesterLevelSpeciality[];

  url(path?: string): string {
    const url = `${this.semesterDepartment.url()}/specialities/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
