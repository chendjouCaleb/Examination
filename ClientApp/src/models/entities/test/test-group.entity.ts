import {Entity} from '../entity';
import {Test} from './test.entity';
import {LocalTime} from '@js-joda/core';
import {List} from '@positon/collections';
import {TestGroupCorrector} from './test-group-corrector.entity';
import {TestGroupSupervisor} from './test-group-supervisor.entity';
import {TestGroupSecretary} from './test-group-secretary.entity';
import {Department, Room} from '../organisation';
import {Paper} from './paper.entity';
import {PaperStatistics} from './paper-statistics';

export class TestGroup extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.capacity = value.capacity;
    this.index = value.index;

    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.closingDate = value.closingDate ? new Date(value.closingDate) : null;
    this.isCorrected = value.isCorrected;

    this.correctedPaperCount = value.correctedPaperCount;
    this.presentPaperCount = value.presentPaperCount;
    this.consignedPaperCount = value.consignedPaperCount;
    this.paperCount = value.paperCount;

    this.roomId = value.roomId;
    this.testId = value.testId;

    this.relation.isCorrector = value.relation?.isCorrector;
    this.relation.isSupervisor = value.relation?.isSupervisor;
    this.relation.isSecretary = value.relation?.isSecretary;
    this.relation.isStudent = value.relation?.isStudent;


    this.statistics = new PaperStatistics();
  }

  capacity: number;

  index: number;

  get isClosed(): boolean {
    return !!this.closingDate;
  };

  get department(): Department {
    return this.test.examinationLevel.level.department;
  }

  closingDate: Date;

  startDate: Date;
  endDate: Date;

  roomId: number;
  room: Room;

  test: Test;
  testId: number;

  isCorrected: boolean;

  paperCount: number;
  correctedPaperCount: number;
  presentPaperCount: number;
  consignedPaperCount: number;

  testGroupCorrectors: List<TestGroupCorrector>;
  testGroupSupervisors: List<TestGroupSupervisor>;
  testGroupSecretaries: List<TestGroupSecretary>;

  papers: List<Paper>;

  relation: UserTestGroup = {};

  statistics: PaperStatistics;

  get expectedStartHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes());
  }

  get expectedEndHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes());
  }

  get startHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes());
  }

  get endHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes());
  }

  get isPlanner(): boolean {
    return this.department.school.userPrincipal.isPlanner;
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


  get hasPrincipalSupervisor(): boolean {
    return this.testGroupSupervisors.exists(t => t.isPrincipal);
  }

  get url(): string {
    return `${this.test?.url}/groups/${this.id}`;
  }

  get hasAllPersonal(): boolean {
    return !this.testGroupSupervisors?.isEmpty() && !this.testGroupCorrectors?.isEmpty();
  }

}

export interface UserTestGroup {
  isPlanner?: boolean;
  isCorrector?: boolean;
  isSupervisor?: boolean;
  isSecretary?: boolean;
  isStudent?: boolean;
}

