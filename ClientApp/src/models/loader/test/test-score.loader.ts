import {Injectable} from '@angular/core';

import {TestLoader} from './test.loader';
import {Loader} from "../loader";
import {Test, TestScore} from "examination/entities";
import {TestScoreHttpClient} from "examination/models/http";


@Injectable({providedIn: 'root'})
export class TestScoreLoader extends Loader<TestScore, number> {

  constructor(private testScoreRepository: TestScoreHttpClient, private _testLoader: TestLoader) {
    super(testScoreRepository);
  }

  async load(item: TestScore): Promise<TestScore> {
    item.test = await this._testLoader.loadById(item.testId);
    return item;
  }

  async loadById(id: number): Promise<TestScore> {
    const item = await this.testScoreRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByTest(test: Test): Promise<void> {
    if (!test.testScores) {
      const testScores = await this.testScoreRepository.listAsync({testId: test.id});
      for (const testScore of testScores) {
        await this.load(testScore);
      }
      test.testScores = testScores;
    }
  }
}
