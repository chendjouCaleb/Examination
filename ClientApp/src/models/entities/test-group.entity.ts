import {Entity} from './entity';
import {Room} from './room.entity';
import {Group} from './group.entity';
import {Test} from './test.entity';
import {LocalTime} from "@js-joda/core";
import {List} from "@positon/collections";
import {TestGroupCorrector} from "./test-group-corrector.entity";
import {TestGroupSupervisor} from "./test-group-supervisor.entity";
import {TestGroupSecretary} from "./test-group-secretary.entity";

export class TestGroup extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);


    this.startDate = new Date(value.startDate);
    this.endDate = new Date(value.endDate);
    this.state = value.state;
    this.isCorrected = value.isCorrected;

    this.roomId = value.roomId;
    this.room = value.room;

    this.groupId = value.groupId;
    this.group = value.group;

    this.test = value.test;
    this.testId = value.testId;
  }

  startDate: Date;
  endDate: Date;

  roomId: number;
  room: Room;

  groupId: number;
  group: Group;

  test: Test;
  testId: number;

  state: string;

  isCorrected: boolean;

  testGroupCorrectors = new List<TestGroupCorrector>();
  testGroupSupervisors = new List<TestGroupSupervisor>();
  testGroupSecretaries = new List<TestGroupSecretary>();

  get expectedStartHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes())
  }

  get expectedEndHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes())
  }


  get hasPrincipalSupervisor(): boolean {
    return this.testGroupSupervisors.exists(t => t.isPrincipal);
  }
}
