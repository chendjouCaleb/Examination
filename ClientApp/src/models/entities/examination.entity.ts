import {Entity} from "./entity";
import {User} from "./user.entity";
import {Organisation} from "./organisation";
import * as moment from 'moment';
import {ExaminationUser} from "./user-examination";

export class Examination extends Entity<number>{

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
    this.state = value.state;

    this.organisationId = value.organisationId;

    this.registerUserId = value.registerUserId;

    this.expectedStartDate = moment(value.expectedStartDate).local(false).toDate();
    this.expectedEndDate = moment(value.expectedEndDate).local(true).toDate();

    this.startDate = value.startDate;
    this.endDate = value.endDate;


    this.testCount = value.testCount;
    this.correctorCount = value.correctorCount;
    this.groupCount = value.groupCount;
    this.specialityCount  = value.specialityCount;
    this.supervisorCount  = value.supervisorCount;
    this.studentCount = value.studentCount;
    this.principalCount = value.principalCount;
    this.reviewCount  = value.reviewCount;
    this.reviewAverage  = value.reviewAverage;
    this.applicationCount  = value.applicationCount;
    this.acceptedApplicationCount = value.acceptedApplicationCount;
    this.rejectedApplicationCount = value.rejectedApplicationCount;
  }


  organisation: Organisation;
  organisationId: number;

  registerUserId: string;
  registerUser: User;

  name: string;
  requireSpeciality: boolean;


  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  state: string;

  userPrincipal: ExaminationUser;

  studentCount: number;

  principalCount: number;

  testCount: number;

  correctorCount: number;

  groupCount: number;

  specialityCount: number;

  supervisorCount: number;


  reviewCount: number;
  reviewAverage: number;

  applicationCount: number;
  acceptedApplicationCount: number;
  rejectedApplicationCount: number;

  get url( ): string {
    return `/organisations/${this.organisationId}/examinations/${this.id}`;
  }
}
