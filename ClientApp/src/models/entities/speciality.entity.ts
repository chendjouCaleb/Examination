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

    if(this.statistics?.nonGroupedStudent > 0) {
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


export class SpecialityStatistics {
  studentCount: number;
  nonGroupedStudent: number;
  groupCount: number;

  testCount: number;
  waitingTestCount: number;
  effectiveTestCount: number;

  applicationCount: number;
  waitingApplicationCount: number;
  acceptedApplicationCount: number;
  rejectedApplicationCount: number;
}
