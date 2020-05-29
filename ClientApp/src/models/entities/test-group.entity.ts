import {Entity} from './entity';
import {Room} from './room.entity';
import {Group} from './group.entity';
import {Test} from './test.entity';

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

}
