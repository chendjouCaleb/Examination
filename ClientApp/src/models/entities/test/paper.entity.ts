import {Entity} from '../entity';
import {List} from '@positon/collections';
import {Contest} from './contest.entity';
import {TestGroup} from './test-group.entity';
import {TestGroupSupervisor} from './test-group-supervisor.entity';
import {TestGroupSecretary} from './test-group-secretary.entity';
import {TestGroupCorrector} from './test-group-corrector.entity';
import {ScorePaper} from './score-paper.entity';
import {User} from '../identity/user.entity';
import {LocalTime} from '@js-joda/core';
import {Test} from './test.entity';
import {ExaminationStudent} from '../examination';
import {TestLevelSpeciality} from "./test-level-speciality.entity";

export class Paper extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.score = value.score;
    this.anonymity = value.anonymity;
    this.groupIndex = value.groupIndex;

    this.testGroupId = value.testGroupId;
    this.testId = value.testId;

    this.examinationStudentId = value.examinationStudentId;
    this.examinationStudent = new ExaminationStudent(value.examinationStudent);


    this.testLevelSpecialityId = value.testLevelSpecialityId;
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

    this.scorePapers = value.scorePapers;
    this.isCorrected = value.isCorrected;
  }

  score: number;
  anonymity: string;
  groupIndex: number;
  startDate: Date;
  endDate: Date;

  isCorrected: boolean;

  test: Test;
  testId: number;

  testGroup: TestGroup;
  testGroupId: number;

  testLevelSpecialityId: number;
  testLevelSpeciality: TestLevelSpeciality;

  examinationStudent: ExaminationStudent;
  examinationStudentId: number;

  testGroupSupervisor: TestGroupSupervisor;
  testGroupSupervisorId: number;
  supervisorUserId: string;
  supervisorUser: User;
  supervisorComment: string;

  collectorUserId: string;
  collectorUser: User;


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

  scorePapers: Array<ScorePaper>;

  contests = new List<Contest>();
  ContestCount: number;


  paperFiles = new List<PaperFile>();
  paperFileCount: number;

  get coefficient(): number {
    return this.test.coefficient;
  }

  get radical(): number {
    return this.test.radical;
  }

  get startHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes());
  }

  get endHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes());
  }

  get isPresent(): boolean {
    return !!this.startDate;
  }

  get index(): number {
    return this.groupIndex;
  }

  get fullName(): string {
    return this.examinationStudent.student.fullName;
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
    if (this.finished) {
      return 'FINISHED';
    }
    if (this.progress) {
      return 'PROGRESS';
    }
    return 'WAITING';
  }

  get scoreSum(): number {
    if (!this.scorePapers) {
      return 0;
    }

    let sum = 0;
    for (const s of this.scorePapers) {
      sum += s.value;
    }
    return sum;
  }

  get hasScores(): boolean {
    return this.scorePapers && this.scorePapers.length > 0;
  }


  get is1_5() {
    return this.score <= this.test?.radical / 5;
  }

  get is2_5() {
    return this.score > this.test.radical / 5 && this.score <= this.test.radical * 2 / 5;
  }

  get is3_5() {
    return this.score > this.test.radical * 2 / 5 && this.score <= this.test.radical * 3 / 5;
  }

  get is4_5() {
    return this.score > this.test.radical * 3 / 5 && this.score <= this.test.radical * 4 / 5;
  }

  get is5_5() {
    return this.score > this.test.radical * 4 / 5 && this.score <= this.test.radical;
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
