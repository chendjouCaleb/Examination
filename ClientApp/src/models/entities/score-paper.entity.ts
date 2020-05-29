import {Entity} from './entity';
import {Score} from './score.entity';
import {Paper} from './paper.entity';

export class ScorePaper extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.value = value.value;
    this.scoreName = value.scoreName;

    this.score = value.score;
    this.scoreId = value.scoreId;

    this.paperId = value.paperId;
    this.paper = value.paper;
  }

  value: number;
  scoreName: string;

  score: Score;
  scoreId: number;

  paperId: number;
  paper: Paper;
}
