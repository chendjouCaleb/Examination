import {Entity} from './entity';
import {Test} from './test.entity';

export class Score extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.name = value.name;
    this.radical = value.radical;

    this.test = value.test;
    this.testId = value.testId;
  }

  name: string;
  radical: number;

  test: Test;
  testId: number;
}
