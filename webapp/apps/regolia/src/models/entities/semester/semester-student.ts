import {Entity} from "../entity";
import {YearStudent} from "../year";
import {SemesterLevelSpeciality} from "./semester-level-speciality";
import {SemesterLevel} from "./semester-level";

export class SemesterStudent extends Entity<number> {

  constructor(value: any = {}) {
    super();
    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearStudentId = value.yearStudentId;
    this.semesterLevelId = value.semesterLevelId;
    this.semesterLevelSpecialityId = value.semesterLevelSpecialityId;

    if(value.yearStudent) {
      this.yearStudent = new YearStudent(value.yearStudent);
    }
  }

  yearStudent: YearStudent;
  yearStudentId: number;

  semesterLevel: SemesterLevel;
  semesterLevelId: number;

  semesterLevelSpeciality: SemesterLevelSpeciality;
  semesterLevelSpecialityId: number;

  isNew: boolean = false;

  url(path?: string): string {
    const url = `${this.semesterLevel?.url()}/students/${this.id}`;
    if(path) {
      return `${url}/${path}`;
    }
    return url;
  }
}
