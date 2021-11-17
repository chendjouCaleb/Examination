import {LevelSpeciality} from "../organisation";
import {Entity} from "../entity";
import {YearSpeciality} from "./year-speciality";
import {YearLevel} from "./year-level";

export class YearLevelSpeciality extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearSpecialityId = value.yearSpecialityId;
    this.levelSpecialityId = value.levelSpecialityId;
    this.yearLevelId = value.yearLevelId;
  }

  yearLevelId: number;
  yearLevel: YearLevel;

  yearSpecialityId: number;
  yearSpeciality: YearSpeciality;

  levelSpeciality: LevelSpeciality;
  levelSpecialityId: number;
}
