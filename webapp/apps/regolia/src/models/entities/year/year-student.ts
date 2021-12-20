import {Entity} from "../entity";
import {YearLevel} from "./year-level";
import {Student} from "../member";
import {YearLevelSpeciality} from "./year-level-speciality";
import {SemesterStudent} from "../semester";

export class YearStudent extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearLevelId = value.yearLevelId;
    this.studentId = value.studentId;
    this.student = new Student(value.student);
    this.yearLevelSpecialityId = value.yearLevelSpecialityId;
  }

  yearLevelId: number;
  yearLevel: YearLevel;

  student: Student;
  studentId: number;

  yearLevelSpeciality: YearLevelSpeciality;
  yearLevelSpecialityId: number;

  isNew: boolean = false;
  semesterStudents: SemesterStudent[];

  url(path?: string): string {
    const url = `${this.yearLevel?.url()}/students/${this.id}`;
    if(path) {
      return `${url}/${path}`;
    }
    return url;
  }
}
