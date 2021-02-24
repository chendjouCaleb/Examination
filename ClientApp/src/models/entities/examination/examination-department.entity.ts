import {Entity} from '../entity';
import {Department} from '../organisation';
import {Examination} from './examination.entity';
import {List} from '@positon/collections';
import {ExaminationStudent} from './examination-student.entity';
import {ExaminationLevel} from './examination-level.entity';
import {ExaminationSpeciality} from './examination-speciality.entity';
import {Test} from '../test';


export class ExaminationDepartment extends Entity<number> {

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
    this.departmentId = value.departmentId;
    this.examinationId = value.examinationId;
    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.isClosed = value.isClosed;

  }

  name: string;
  isClosed: boolean;


  startDate: Date;
  endDate: Date;

  department: Department;
  departmentId: number;

  examination: Examination;
  examinationId: number;

  statistics: ExaminationDepartmentStatistics;

  examinationStudents: List<ExaminationStudent>;
  examinationLevels: List<ExaminationLevel>;
  examinationSpecialities: List<ExaminationSpeciality>;
  tests: List<Test>;

  get url(): string {
    return `${this.examination?.url}/departments/${this.id}`;
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



export interface ExaminationDepartmentStatistics {

  studentCount: number;

  testCount: number;
  waitingTestCount: number;
  progressTestCount: number;
  closedTestCount: number;
  publishedTestCount: number;
  completedTestCount: number;

}
