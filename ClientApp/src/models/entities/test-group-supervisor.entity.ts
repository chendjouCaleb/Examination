import {Entity} from './entity';
import {Supervisor} from './supervisor.entity';
import {TestGroup} from './test-group.entity';

export class TestGroupSupervisor extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.paperCount = value.paperCount;
    this.isPrincipal = value.isPrincipal;

    this.supervisorId = value.supervisorId;
    this.supervisor = value.supervisor;

    this.testGroupId = value.testGroupId;
    this.testGroup = value.testGroup;
  }


  supervisorId: number;
  supervisor: Supervisor;

  testGroupId: number;
  testGroup: TestGroup;

  isPrincipal: boolean;
  paperCount: number;

}
