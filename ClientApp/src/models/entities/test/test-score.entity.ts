import {Test} from './test.entity';
import {Entity} from '../entity';

export class TestScore extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.name = value.name;
    this.radical = value.radical;

    this.testId = value.testId;
  }

  name: string;
  radical: number;

  testId: number;
  test: Test;
}
