import {Entity} from "./entity";
import {User} from "./user.entity";
import {Organisation} from "./organisation";
import  moment from 'moment';
import {ExaminationUser} from "./user-examination";

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
    this.requireSpeciality = value.requireSpeciality;

    this.organisationId = value.organisationId;

    this.registerUserId = value.registerUserId;

    this.expectedStartDate = moment(value.expectedStartDate).local(false).toDate();
    this.expectedEndDate = moment(value.expectedEndDate).local(true).toDate();

    this.startDate = value.startDate;
    this.endDate = value.endDate;
    this.isClosed = value.isClosed;

    this.grouped = value.grouped;
    this.lastGroupingDate = value.lastGroupingDate;

    this.testCount = value.testCount;
    this.correctorCount = value.correctorCount;
    this.groupCount = value.groupCount;
    this.specialityCount = value.specialityCount;
    this.supervisorCount = value.supervisorCount;
    this.secretaryCount = value.secretaryCount;
    this.studentCount = value.studentCount;
    this.principalCount = value.principalCount;

    this.waitingTestCount = value.waitingTestCount;
    this.progressTestCount = value.progressTestCount;
    this.closedTestCount = value.closedTestCount;

    this.reviewCount = value.reviewCount;
    this.reviewAverage = value.reviewAverage;
    this.applicationCount = value.applicationCount;
    this.acceptedApplicationCount = value.acceptedApplicationCount;
    this.rejectedApplicationCount = value.rejectedApplicationCount;

    this.nonGroupedStudentsCount = value.nonGroupedStudentsCount;

    if(this.statistics?.nonGroupedStudentsCount > 0) {
      this.requireGrouping = true;
    }
  }


  organisation: Organisation;
  organisationId: number;

  registerUserId: string;
  registerUser: User;

  name: string;
  requireSpeciality: boolean;

  grouped: boolean;
  lastGroupingDate: Date;

  requireGrouping: boolean;


  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  isClosed: boolean;

  userPrincipal: ExaminationUser;

  testCount: number;
  groupCount: number;
  specialityCount: number;
  studentCount: number;

  correctorCount: number;
  principalCount: number;
  supervisorCount: number;
  secretaryCount: number;

  waitingTestCount: number = 0;
  progressTestCount: number = 0;
  closedTestCount: number = 0;

  reviewCount: number;
  reviewAverage: number;

  applicationCount: number;
  acceptedApplicationCount: number;
  rejectedApplicationCount: number;


  nonGroupedStudentsCount: number;

  statistics: ExaminationStatistics;

  get url(): string {
    return `/organisations/${this.organisationId}/examinations/${this.id}`;
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



export interface ExaminationStatistics {

  groupCount: number;
  specialityCount: number;

  nonGroupedStudentsCount: number;
  studentCount: number;

  correctorCount: number;
  principalCount: number;
  supervisorCount: number;
  secretaryCount: number;

  testCount: number;
  waitingTestCount: number;
  progressTestCount: number;
  closedTestCount: number;
  publishedTestCount: number;
  completedTestCount: number;

  reviewCount: number;
  reviewAverage: number;

  applicationCount: number;
  acceptedApplicationCount: number;
  rejectedApplicationCount: number;
}
