import {Level} from "../organisation";
import {Entity} from "../entity";
import {YearDepartment} from "./year-department";
import {YearLevelSpeciality} from "./year-level-speciality";

export class YearLevel extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearDepartmentId = value.yearDepartmentId;
    this.levelId = value.levelId;
  }

  yearDepartmentId: number;
  yearDepartment: YearDepartment;

  level: Level;
  levelId: number;

  yearLevelSpecialities: YearLevelSpeciality[];
}
