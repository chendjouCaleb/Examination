import {Year} from "./year";
import {Department, Speciality} from "../organisation";
import {Entity} from "../entity";
import {YearLevelSpeciality} from "./year-level-speciality";
import {YearDepartment} from "./year-department";

export class YearSpeciality extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearDepartmentId = value.yearDepartmentId;
    this.specialityId = value.specialityId;
  }

  yearDepartmentId: number;
  yearDepartment: YearDepartment;

  speciality: Speciality;
  specialityId: number;

  yearLevelSpecialities: YearLevelSpeciality[];
}
