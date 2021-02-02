import {Entity} from '../entity';
import {Level} from '../organisation';
import {ExaminationDepartment, ExaminationLevelSpeciality, ExaminationStudent, Test} from 'examination/entities';
import {List} from "@positon/collections";
import {ExaminationLevelStatistics} from "./examination-statistics";


export class ExaminationLevel extends Entity<number> {

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
    this.levelId = value.levelId;
    this.level = new Level(value.level);
    this.examinationDepartmentId = value.examinationDepartmentId;
    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.isClosed = value.isClosed;

    this.statistics = new ExaminationLevelStatistics();
    const statistics = JSON.parse(value.statistics);

    Object.assign(this.statistics, statistics);

  }

  name: string;
  isClosed: boolean;


  startDate: Date;
  endDate: Date;

  level: Level;
  levelId: number;

  examinationDepartment: ExaminationDepartment;
  examinationDepartmentId: number;

  examinationStudents: List<ExaminationStudent>;

  examinationLevelSpecialities: List<ExaminationLevelSpeciality>;

  tests: List<Test>;

  statistics: ExaminationLevelStatistics;

  get url(): string {
    return `${this.examinationDepartment.url}/levels/${this.id}`;
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

