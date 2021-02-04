import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {LocalTime} from '@js-joda/core';
import {List} from '@positon/collections';
import {TestGroup} from './test-group.entity';
import {Course} from '../organisation';
import {ExaminationLevel, ExaminationLevelSpeciality} from '../examination';
import {TestScore} from './test-score.entity';
import {sum} from '../../../controls/array';
import {TestLevelSpeciality} from './test-level-speciality.entity';
import {Paper} from './paper.entity';
import {PaperStatistics} from './paper-statistics';

export class Test extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.coefficient = value.coefficient;

    this.publicationDate = value.publicationDate ? new Date(value.publicationDate) : undefined;
    this.closingDate = value.closingDate ? new Date(value.closingDate) : undefined;

    this.radical = value.radical;
    this.useAnonymity = value.useAnonymity;
    this.multipleScore = value.multipleScore;
    this.isGeneral = value.isGeneral;


    this.expectedStartDate = new Date(value.expectedStartDate);
    this.expectedEndDate = new Date(value.expectedEndDate);

    this.startDate = value.startDate ? new Date(value.startDate) : undefined;
    this.endDate = value.endDate ? new Date(value.endDate) : undefined;

    this.isCorrected = value.isCorrected;
    this.isDone = value.isDone;

    this.testGroupCount = value.testGroupCount;
    this.correctedPaperCount = value.correctedPaperCount;
    this.presentPaperCount = value.presentPaperCount;
    this.consignedPaperCount = value.consignedPaperCount;
    this.notGroupedStudentCount = value.notGroupedStudentCount;
    this.paperCount = value.paperCount;

    this.courseId = value.courseId;
    this.examinationLevelId = value.examinationLevelId;
    this.examinationLevelSpecialityId = value.examinationLevelSpecialityId;

    this.registerUserId = value.registerUserId;
  }

  registerUserId: string;
  registerUser: User;

  coefficient: number;
  radical: number;
  multipleScore: boolean;
  useAnonymity: boolean;
  isGeneral: boolean;

  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;

  testGroupCount: number;
  paperCount: number;
  correctedPaperCount: number;
  presentPaperCount: number;
  consignedPaperCount: number;

  notGroupedStudentCount: number;

  statistics: PaperStatistics = new PaperStatistics();

  get isPublished(): boolean {
    return !!this.publicationDate;
  };

  publicationDate: Date;

  get isClosed(): boolean {
    return !!this.closingDate;
  };

  closingDate: Date;


  course: Course;
  courseId: number;

  examinationLevel: ExaminationLevel;
  examinationLevelId: number;

  examinationLevelSpeciality: ExaminationLevelSpeciality;
  examinationLevelSpecialityId: number;


  isDone: boolean;
  isCorrected: boolean;

  testGroups: List<TestGroup>;
  testScores: List<TestScore>;
  papers: List<Paper>;
  testLevelSpecialities: List<TestLevelSpeciality>;


  isSupervisor: boolean = false;
  isCorrector: boolean = false;
  isSecretary: boolean = false;
  isStudent: boolean = false;
  isPlanner: boolean = false;

  removeTestGroup(testGroup: TestGroup) {
    if (!this.testGroups) {
      return;
    }

    this.testGroups.removeIf(t => t.id === testGroup.id);

    this.testGroups.forEach((item, index) => item.index = index);
  }

  get totalScoreRadical(): number {
    if (!this.testScores) {return 0; }
    return sum(this.testScores.toArray(), s => s.radical)
  }

  get expectedStartHour(): LocalTime {
    return LocalTime.of(this.expectedStartDate.getHours(), this.expectedStartDate.getMinutes());
  }

  get expectedEndHour(): LocalTime {
    return LocalTime.of(this.expectedEndDate.getHours(), this.expectedEndDate.getMinutes());
  }

  get startHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes());
  }

  get endHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes());
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

  get specialityNames(): string[] {
    if (!this.testLevelSpecialities) {return []}

    return this.testLevelSpecialities.toArray().map(t => t.examinationLevelSpeciality.levelSpeciality.speciality.name);
  }

  get url(): string {
    return `${this.examinationLevel?.url}/tests/${this.id}`;
  }

  get apiUrl(): string {
    return `tests/${this.id}`;
  }

}


export interface UserTest {
  isCorrector: boolean;
  isSupervisor: boolean;
  isSecretary: boolean;
  isStudent: boolean;
}
