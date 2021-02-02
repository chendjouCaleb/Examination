import {IsNotEmpty, MinLength} from 'class-validator';

export class ScoreAddModel {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  radical: number;
}



export class ScorePaperModel {
  @IsNotEmpty()
  testScoreId: number;

  @IsNotEmpty()
  value: number;
}
