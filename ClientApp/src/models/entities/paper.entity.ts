import {Entity} from './entity';
import {Student} from './student.entity';
import {List} from '@positon/collections';
import {Contest} from './contest.entity';
import {PaperReview} from './review.entity';
import {TestGroup} from './test-group.entity';
import {TestGroupSupervisor} from './test-group-supervisor.entity';
import {TestGroupSecretary} from './test-group-secretary.entity';
import {TestGroupCorrector} from './test-group-corrector.entity';
import {ScorePaper} from './score-paper.entity';
import {User} from './user.entity';
import {LocalTime} from "@js-joda/core";

export class Paper extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.score = value.score;
    this.anonymity = value.anonymity;

    this.testGroupId = value.testGroupId;
    this.testGroup = value.testGroup;

    this.studentId = value.studentId;
    this.student = value.student;


    this.testGroupSupervisorId = value.testGroupSupervisorId;
    this.supervisorUserId = value.supervisorUserId;
    this.collectorUserId = value.collectorUserId;
    this.supervisorComment = value.supervisorComment;

    this.testGroupCorrectorId = value.testGroupCorrectorId;
    this.correctorUserId = value.correctorUserId;
    this.correctorComment = value.correctorComment;

    this.testGroupSecretaryId = value.testGroupSecretaryId;
    this.secretaryUserId = value.secretaryUserId;
    this.collectorUserId = value.collectorUserId;
    this.secretaryComment = value.secretaryComment;
  }

  score: number;
  anonymity: string;
  startDate: Date;
  endDate: Date;


  testGroup: TestGroup;
  testGroupId: number;

  student: Student;
  studentId: number;

  testGroupSupervisor: TestGroupSupervisor;
  testGroupSupervisorId: number;
  supervisorUserId: string;
  supervisorUser: User;

  collectorUserId: string;
  collectorUser: User;
  supervisorComment: string;

  testGroupSecretary: TestGroupSecretary;
  testGroupSecretaryId: number;
  secretaryUserId: string;
  secretaryUser: User;
  secretaryComment: string;

  testGroupCorrector: TestGroupCorrector;
  testGroupCorrectorId: number;
  correctorUserId: string;
  correctorUser: User;
  correctorComment: string;

  scorePapers = new List<ScorePaper>();

  contests = new List<Contest>();
  ContestCount: number;

  reviews = new List<PaperReview>();
  reviewCount: number;

  paperFiles = new List<PaperFile>();
  paperFileCount: number;

  get startHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes())
  }

  get endHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes())
  }

  get isPresent(): boolean {
    return !!this.startDate;
  }

  get index(): number {
    return this.student.groupIndex;
  }

  get fullName(): string {
    return this.student.fullName;
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

  get state(): string {
    if(this.finished){
      return 'FINISHED';
    }
    if(this.progress) {
      return 'PROGRESS';
    }
    return 'WAITING'
  }

}


export class PaperFile extends Entity<number> {
  name: string;
  corrected: boolean;
  index: number;
  url: string;

  paper: Paper;
  paperId: number;
}
