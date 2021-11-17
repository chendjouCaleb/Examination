import {Year} from "./year";
import {Department} from "../organisation";
import {Entity} from "../entity";
import {YearLevel} from "./year-level";
import {YearSpeciality} from "./year-speciality";

export class YearDepartment extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearId = value.yearId;
    this.departmentId = value.departmentId;
  }

  yearId: number;
  year: Year;

  department: Department;
  departmentId: number;

  yearLevels: YearLevel[];
  yearSpecialities: YearSpeciality[];
}
