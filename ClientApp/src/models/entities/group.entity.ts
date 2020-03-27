import {Entity} from "./entity";
import {Test} from "./test.entity";

export class Group extends Entity<number> {
  name: string;
  roomName: string;

  expectedStartDate: Date;
  expectedEndDate: Date;

  realStartDate: Date;
  realEndDate: Date;

  state: string;

  test: Test;
  testId: number;

  paperCount: number;

  testSupervisorCount: number;
}
