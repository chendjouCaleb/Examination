import {Entity} from './entity';
import {Examination} from './examination.entity';
import {User} from './user.entity';

export class Speciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.name = value.name;

      this.grouped = value.grouped;
      this.lastGroupingDate = value.lastGroupingDate;

      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }

    if(this.statistics?.nonGroupedStudentsCount > 0) {
      this.requireGrouping = true;
    }
  }

  name: string;
  grouped: boolean;
  lastGroupingDate: Date;

  examination: Examination;
  examinationId: number;

  registerUserId: string;
  registerUser: User;

  studentCount: number;
  testCount: number;

/** Indique si le groupe doit etre groupé */
  requireGrouping: boolean = false;

  statistics: SpecialityStatistics;

  get url(): string {
    return `/organisations/${this.examination.organisationId}/examinations/${this.examinationId}/specialities/${this.id}`;
  }
}


export interface SpecialityStatistics {
  studentCount: number;
  nonGroupedStudentsCount: number;
  groupCount: number;

  testCount: number;
  waitingTestCount: number;
  progressTestCount: number;
  closedTestCount: number;

  applicationCount: number;
  waitingApplicationCount: number;
  acceptedApplicationCount: number;
  rejectedApplicationCount: number;
}
