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

export class Paper extends Entity<number> {

  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);


    this.startDate = new Date(value.startDate);
    this.endDate = new Date(value.endDate);
    this.score = value.score;
    this.anonymity = value.anonymity;

    this.testGroupId = value.testGroupId;
    this.testGroup = value.testGroup;

    this.studentId = value.studentId;
    this.student = value.student;

    this.testGroupSupervisor = value.testGroupSupervisor;
    this.testGroupSupervisorId = value.testGroupSupervisorId;
    this.supervisorUserId = value.supervisorUserId;
    this.collectorUserId = value.collectorUserId;
    this.supervisorComment = value.supervisorComment;

    this.testGroupCorrector = value.testGroupCorrector;
    this.testGroupCorrectorId = value.testGroupCorrectorId;
    this.correctorUserId = value.correctorUserId;
    this.correctorComment = value.correctorComment;

    this.testGroupSecretary = value.testGroupSecretary;
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
  collectorUserId: string;
  supervisorComment: string;

  testGroupSecretary: TestGroupSecretary;
  testGroupSecretaryId: number;
  secretaryUserId: string;
  secretaryComment: string;

  testGroupCorrector: TestGroupCorrector;
  testGroupCorrectorId: number;
  correctorUserId: string;
  correctorComment: string;

  scorePapers = new List<ScorePaper>();

  contests = new List<Contest>();
  ContestCount: number;

  reviews = new List<PaperReview>();
  reviewCount: number;

  paperFiles = new List<PaperFile>();
  paperFileCount: number;

}


export class PaperFile extends Entity<number> {
  name: string;
  corrected: boolean;
  index: number;
  url: string;

  paper: Paper;
  paperId: number;
}
