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
    this.secretary = value.secretary;

    this.testGroupId = value.testGroupId;
    this.testGroup = value.testGroup;
  }


  secretaryId: number;
  secretary: Secretary;

  testGroupId: number;
  testGroup: TestGroup;


  paperCount: number;

}
