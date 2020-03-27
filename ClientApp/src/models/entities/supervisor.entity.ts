import {Entity} from "./entity";
import {User} from "./user.entity";
import {Examination} from "./examination";
import {Test} from "./test.entity";
import {Group} from "./group.entity";

export class Supervisor extends Entity<number> {
  user: User;
  userId: number;

  examination: Examination;
  examinationId: number;
}


export class TestSupervisor extends Entity<number>{
  isPrincipal: boolean;
  supervisor: Supervisor;
  supervisorId: number;

  test: Test;
  testId: number;

  group: Group;
  groupId: number;
}
