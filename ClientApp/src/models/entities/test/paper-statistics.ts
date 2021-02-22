import {Paper} from "examination/entities";

export class PaperStatistics {

  minPaper: Paper;
  maxPaper: Paper;

  frequency: number;
  mean: number;
  median: number;
  skewness: number;
  std: number;
  mode: number;
  min: number;
  max: number;

  quartile0: number;
  quartile1: number;
  quartile2: number;

  presence: number;

  correctedFrequency: number;
  consignedFrequency: number;

  radical: number;

  scores: number[] = [];

  get isAllCorrected(): boolean {
    return this.frequency !== 0 && this.correctedFrequency - this.frequency === 0;
  }

  get isAllPresent(): boolean {
    return this.frequency !== 0 && this.presence - this.frequency === 0;
  }

  get isAllConsigned(): boolean {
    return this.frequency !== 0 && this.consignedFrequency - this.frequency === 0;
  }


  get quartile0Scores(): number[] {
    return this.scores.filter(s => s <= this.quartile0);
  }

  get quartile1Scores(): number[] {
    return this.scores.filter(s => s > this.quartile0 && s <= this.quartile1);
  }

  get quartile2Scores(): number[] {
    return this.scores.filter(s => s > this.quartile1 && s <= this.quartile2);
  }

  get quartile3Scores(): number[] {
    return this.scores.filter(s => s > this.quartile2);
  }


  get range0Scores(): number[] {
    return this.scores.filter(s => s <= this.radical / 4);
  }

  get range1Scores(): number[] {
    return this.scores.filter(s => s > this.radical / 4 && s <= this.radical / 2);
  }

  get range2Scores(): number[] {
    return this.scores.filter(s => s > this.radical / 2 && s <= this.radical * 3 / 4);
  }

  get range3Scores(): number[] {
    return this.scores.filter(s => s > this.radical * 3 / 4);
  }
}
