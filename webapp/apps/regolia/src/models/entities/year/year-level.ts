import {Level} from "../organisation";
import {Entity} from "../entity";
import {YearDepartment} from "./year-department";
import {YearLevelSpeciality} from "./year-level-speciality";
import {SemesterLevel} from "../semester";
import {YearStudent} from "./year-student";

export class YearLevel extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearDepartmentId = value.yearDepartmentId;
    this.levelId = value.levelId;

    if(value.level) {
      this.level = new Level(value.level);
    }

  }

  yearDepartmentId: number;
  yearDepartment: YearDepartment;

  level: Level;
  levelId: number;

  yearLevelSpecialities: YearLevelSpeciality[];
  semesterLevels: SemesterLevel[];
  yearStudents: YearStudent[];

  url(path?: string): string {
    const url = `${this.yearDepartment.url()}/levels/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
