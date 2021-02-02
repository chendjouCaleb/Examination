import {Entity} from '../entity';
import {TestGroup} from './test-group.entity';
import {Supervisor} from '../member';

export class TestGroupSupervisor extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.paperCount = value.paperCount;
    this.isPrincipal = value.isPrincipal;

    this.supervisorId = value.supervisorId;

    this.testGroupId = value.testGroupId;

    this.paperCount = value.paperCount;
  }


  supervisorId: number;
  supervisor: Supervisor;

  testGroupId: number;
  testGroup: TestGroup;

  isPrincipal: boolean;
  paperCount: number;

}
