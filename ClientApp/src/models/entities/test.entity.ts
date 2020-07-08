import {Entity} from './entity';
import {User} from './user.entity';
import {Speciality} from './speciality.entity';
import {Examination} from './examination.entity';
import {LocalTime} from "@js-joda/core";
import {List} from "@positon/collections";
import {TestGroup} from "./test-group.entity";
import {Score} from "./score.entity";

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
    this.publicationDate = value.publicationDate ? new Date(value.publicationDate) : undefined;

    this.isClosed = value.isClosed;
    this.closingDate = new Date(value.closingDate);

    this.useAnonymity = value.useAnonymity;


    this.expectedStartDate = new Date(value.expectedStartDate);
    this.expectedEndDate = new Date(value.expectedEndDate);

    this.startDate = value.startDate ? new Date(value.startDate): undefined;
    this.endDate = value.endDate ? new Date(value.endDate):undefined;

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

  testGroups: List<TestGroup> = new List<TestGroup>();
  scores: List<Score> = new List<Score>();

  isSupervisor: boolean = false;
  isCorrector: boolean = false;
  isSecretary: boolean = false;
  isStudent: boolean = false;

  get totalScoreRadical(): number {
    let sum = 0;
    this.scores.forEach(s => sum += s.radical);
    return sum;
  }

  get expectedStartHour(): LocalTime {
    return LocalTime.of(this.expectedStartDate.getHours(), this.expectedStartDate.getMinutes())
  }

  get expectedEndHour(): LocalTime {
    return LocalTime.of(this.expectedEndDate.getHours(), this.expectedEndDate.getMinutes())
  }

  get startHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes())
  }

  get endHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes())
  }

  get waiting(): boolean {
    return !this.startDate;
  }

  get finished(): boolean {
    return !!this.endDate;
  }

  get progress(): boolean {
    return !!this.startDate && !this.endDate;
  }

  get singleScore(): boolean {
    return !this.multipleScore;
  }

  get url(): string {
    return `/organisations/${this.examination.organisationId}/examinations/${this.examinationId}/tests/${this.id}`;
  }

  get apiUrl(): string {
    return `tests/${this.id}`
  }

}


export interface UserTest {
  isCorrector: boolean;
  isSupervisor: boolean;
  isSecretary: boolean;
  isStudent: boolean;
}
