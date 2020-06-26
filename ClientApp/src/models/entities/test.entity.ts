import {Entity} from './entity';
import {User} from './user.entity';
import {Speciality} from './speciality.entity';
import {Examination} from './examination.entity';
import {LocalTime} from "@js-joda/core";

export class Test extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.name = value.name;
    this.code = value.code;
    this.coefficient = value.coefficient;
    this.radical = value.radical;

    this.isPublished = value.isPublished;
    this.publicationDate = new Date(value.publicationDate);

    this.isClosed = value.isClosed;
    this.closingDate = new Date(value.closingDate);

    this.useAnonymity = value.useAnonymity;


    this.expectedStartDate = new Date(value.expectedStartDate);
    this.expectedEndDate = new Date(value.expectedEndDate);

    this.startDate = new Date(value.startDate);
    this.endDate = new Date(value.endDate);

    this.multipleScore = value.multipleScore;

    this.state = value.state;
    this.groupsState = value.groupsState;

    this.isCorrected = value.isCorrected;
    this.isDone = value.isDone;

    this.specialityId = value.specialityId;

    this.examinationId = value.examinationId;

    this.registerUserId = value.registerUserId;
  }

  registerUserId: string;
  registerUser: User;


  name: string;
  code: string;
  coefficient: number;

  radical: number;

  isPublished: boolean;
  publicationDate: Date;

  isClosed: boolean;
  closingDate: Date;

  useAnonymity: boolean;

  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  speciality: Speciality;
  specialityId: number;

  examination: Examination;
  examinationId: number;

  multipleScore: boolean;

  state: string;

  groupsState: string;

  isDone: boolean;
  isCorrected: boolean;


  get expectedStartHour(): LocalTime {
    return LocalTime.of(this.expectedStartDate.getHours(), this.expectedStartDate.getMinutes())
  }

  get expectedEndHour(): LocalTime {
    return LocalTime.of(this.expectedEndDate.getHours(), this.expectedEndDate.getMinutes())
  }

  get singleScore(): boolean {
    return !this.multipleScore;
  }

}
