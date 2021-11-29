import {LevelSpeciality} from "../organisation";
import {Entity} from "../entity";
import {YearSpeciality} from "./year-speciality";
import {YearLevel} from "./year-level";
import {SemesterLevelSpeciality} from "../semester";
import {YearStudent} from "./year-student";

export class YearLevelSpeciality extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.yearSpecialityId = value.yearSpecialityId;
    this.levelSpecialityId = value.levelSpecialityId;

    if(value.levelSpeciality){
      this.levelSpeciality = new LevelSpeciality(value.levelSpeciality);
    }

    this.yearLevelId = value.yearLevelId;
  }

  yearLevelId: number;
  yearLevel: YearLevel;

  yearSpecialityId: number;
  yearSpeciality: YearSpeciality;

  levelSpeciality: LevelSpeciality;
  levelSpecialityId: number;

  semesterLevelSpecialities: SemesterLevelSpeciality[];
  yearStudents: YearStudent[];

  url(path?: string): string {
    const url = `${this.yearLevel.url()}/specialities/${this.id}`;
    if(path) {
      return `${url}/path`;
    }
    return url;
  }
}
