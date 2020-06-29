import {Entity} from './entity';
import {Secretary} from './secretary.entity';
import {TestGroup} from './test-group.entity';

export class TestGroupSecretary extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.paperCount = value.paperCount;

    this.secretaryId = value.secretaryId;

    this.testGroupId = value.testGroupId;
  }

  secretaryId: number;
  secretary: Secretary;

  testGroupId: number;
  testGroup: TestGroup;


  paperCount: number;

}
