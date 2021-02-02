import {Entity} from '../entity';
import {LevelSpeciality} from '../organisation';

import {ExaminationSpeciality} from './examination-speciality.entity';
import {ExaminationLevel} from './examination-level.entity';
import {List} from "@positon/collections";
import {ExaminationStudent} from "./examination-student.entity";
import {Test, TestLevelSpeciality} from "../test";


export class ExaminationLevelSpeciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.apply(value);
    }
  }

  apply(value: any = {}) {
    this.id = value.id;
    this.registrationDate = value.registrationDate;
    this.name = value.name;
    this.levelSpecialityId = value.levelSpecialityId;
    this.examinationSpecialityId = value.examinationSpecialityId;
    this.examinationLevelId = value.examinationLevelId;
    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.isClosed = value.isClosed;

  }

  name: string;
  isClosed: boolean;


  startDate: Date;
  endDate: Date;

  levelSpeciality: LevelSpeciality;
  levelSpecialityId: number;

  examinationSpeciality: ExaminationSpeciality;
  examinationSpecialityId: number;

  examinationLevel: ExaminationLevel;
  examinationLevelId: number;

  examinationStudents: List<ExaminationStudent>;

  testLevelSpecialities: List<TestLevelSpeciality>;

  tests: List<Test>;

  statistics: ExaminationLevelSpecialityStatistics;

  get url(): string {
    return `${this.examinationLevel?.url}/specialities/${this.id}`;
  }

  get specialityUrl(): string {
    return `${this.examinationSpeciality?.url}/levels/${this.id}`;
  }


  get state(): string {
    if (this.isClosed) {
      return 'CLOSED';
    }
    if (this.endDate) {
      return 'FINISHED';
    }
    if (this.startDate) {
      return 'PROGRESS';
    }

    return 'PENDING';
  }
}



export interface ExaminationLevelSpecialityStatistics {

  studentCount: number;

  testCount: number;
  waitingTestCount: number;
  progressTestCount: number;
  closedTestCount: number;
  publishedTestCount: number;
  completedTestCount: number;

}
