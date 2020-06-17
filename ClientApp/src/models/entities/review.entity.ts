import {Entity} from "./entity";
import {User} from "./user.entity";
import {Examination} from "./examination.entity";
import {Paper} from "./paper.entity";
import {Test} from "./test.entity";

export class Review extends Entity<number> {
  user: User;
  userId: string;

  score: number;
  comment: string;
}

export class ExaminationReview extends Review {
  examination: Examination;
  examinationId: number;
}

export class PaperReview extends Review {
  paper: Paper;
  paperId: number;
}

export class TestReview extends Review {
  test: Test;
  testId: number;
}
