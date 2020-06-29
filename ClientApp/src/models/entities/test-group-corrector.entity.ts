﻿import {Entity} from './entity';
import {Corrector} from './corrector.entity';
import {TestGroup} from './test-group.entity';

export class TestGroupCorrector extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.paperCount = value.paperCount;

    this.correctorId = value.correctorId;

    this.testGroupId = value.testGroupId;
  }


  correctorId: number;
  corrector: Corrector;

  testGroupId: number;
  testGroup: TestGroup;


  paperCount: number;

}
