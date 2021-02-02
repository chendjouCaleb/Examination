import {Entity} from '../entity';
import {Speciality} from '../organisation';
import {
  ExaminationDepartment,
  ExaminationLevelSpeciality,
  ExaminationStudent,
  Test,
  TestLevelSpeciality
} from 'examination/entities';
import {List} from "@positon/collections";


export class ExaminationSpeciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.apply(value);
    }
  }

  apply(value: any = {}) {
    this.id = value.id;
    this.registrationDate = value.registrationDate;
    this.specialityId = value.specialityId;
    this.examinationDepartmentId = value.examinationDepartmentId;
    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.isClosed = value.isClosed;

  }

  isClosed: boolean;


  startDate: Date;
  endDate: Date;

  speciality: Speciality;
  specialityId: number;

  examinationDepartment: ExaminationDepartment;
  examinationDepartmentId: number;

  examinationStudents: List<ExaminationStudent>;

  examinationLevelSpecialities: List<ExaminationLevelSpeciality>;
  testLevelSpecialities: List<TestLevelSpeciality>;


  tests: List<Test>;

  statistics: ExaminationSpecialityStatistics;

  get url(): string {
    return `${this.examinationDepartment?.url}/specialities/${this.id}`;
  }


  get name(): string {
    return this.speciality?.name;
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


export interface ExaminationSpecialityStatistics {

  studentCount: number;

  testCount: number;
  waitingTestCount: number;
  progressTestCount: number;
  closedTestCount: number;
  publishedTestCount: number;
  completedTestCount: number;

}
