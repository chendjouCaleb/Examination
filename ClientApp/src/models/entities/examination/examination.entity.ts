import {Entity} from '../entity';
import moment from 'moment';
import {School} from '../organisation';
import {List} from '@positon/collections';
import {ExaminationDepartment} from './examination-department.entity';
import {ExaminationStudent} from './examination-student.entity';
import {ExaminationLevel} from './examination-level.entity';
import {ExaminationSpeciality} from './examination-speciality.entity';
import {Test} from "../test";
import {ExaminationStatistics} from "./examination-statistics";

export class Examination extends Entity<number> {

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
    this.schoolId = value.schoolId;
    this.expectedStartDate = moment(value.expectedStartDate).local(false).toDate();
    this.expectedEndDate = moment(value.expectedEndDate).local(true).toDate();

    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.isClosed = value.isClosed;

    this.statistics = new ExaminationStatistics();
    Object.assign(this.statistics, JSON.parse(value.statistics));

  }

  name: string;
  isClosed: boolean;

  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  school: School;
  schoolId: number;

  statistics: ExaminationStatistics;

  examinationDepartments: List<ExaminationDepartment>;

  examinationStudents: List<ExaminationStudent>;

  examinationLevels: List<ExaminationLevel>;

  examinationSpecialities: List<ExaminationSpeciality>;

  tests: List<Test>;

  get url(): string {
    return `/schools/${this.schoolId}/examinations/${this.id}`;
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



