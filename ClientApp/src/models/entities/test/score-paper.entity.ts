import {Entity} from '../entity';
import {Paper} from './paper.entity';
import {TestScore} from "./test-score.entity";

export class ScorePaper extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.value = value.value;
    this.scoreName = value.scoreName;
    this.radical = value.radical;

    this.testScoreId = value.testScoreId;
    this.paperId = value.paperId;
  }

  value: number;
  scoreName: string;
  radical: number;

  testScore: TestScore;
  testScoreId: number;

  paperId: number;
  paper: Paper;
}
