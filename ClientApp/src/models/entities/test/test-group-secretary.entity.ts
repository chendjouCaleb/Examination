import {Entity} from '../entity';
import {TestGroup} from './test-group.entity';
import {Secretary} from '../member';

export class TestGroupSecretary extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.paperCount = value.paperCount;

    this.secretaryId = value.secretaryId;

    this.testGroupId = value.testGroupId;

    this.paperCount = value.paperCount;
  }

  secretaryId: number;
  secretary: Secretary;

  testGroupId: number;
  testGroup: TestGroup;


  paperCount: number;

}
