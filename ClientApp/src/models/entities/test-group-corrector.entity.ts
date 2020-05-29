import {Entity} from './entity';
import {Corrector} from './corrector.entity';
import {TestGroup} from './test-group.entity';

export class TestGroupCorrector extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.paperCount = value.paperCount;

    this.correctorId = value.correctorId;
    this.corrector = value.corrector;

    this.testGroupId = value.testGroupId;
    this.testGroup = value.testGroup;
  }


  correctorId: number;
  corrector: Corrector;

  testGroupId: number;
  testGroup: TestGroup;


  paperCount: number;

}
