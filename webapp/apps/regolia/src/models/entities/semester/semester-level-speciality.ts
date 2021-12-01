import {LevelSpeciality} from "../organisation";
import {Entity} from "../entity";
import {SemesterSpeciality} from "./semester-speciality";
import {SemesterLevel} from "./semester-level";
import {YearLevelSpeciality} from "../year";
import {SemesterStudent} from "./semester-student";

export class SemesterLevelSpeciality extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.semesterSpecialityId = value.semesterSpecialityId;
    this.yearLevelSpecialityId = value.yearLevelSpecialityId;
    this.semesterLevelId = value.semesterLevelId;
  }

  semesterLevelId: number;
  semesterLevel: SemesterLevel;

  semesterSpecialityId: number;
  semesterSpeciality: SemesterSpeciality;

  yearLevelSpeciality: YearLevelSpeciality;
  yearLevelSpecialityId: number;

  semesterStudents: SemesterStudent[];

  url(path?: string): string {
    const url = `${this.semesterLevel.url()}/specialities/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
