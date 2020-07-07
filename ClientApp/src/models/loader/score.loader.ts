import {Injectable} from '@angular/core';
import {Score, Test} from '../entities';
import {ScoreHttpClient} from '../httpClient';
import {TestLoader} from './test.loader';
import {List} from "@positon/collections";
import {Loader} from "./loader";


@Injectable({providedIn: 'root'})
export class ScoreLoader extends Loader<Score, number> {

  constructor(private scoreRepository: ScoreHttpClient, private _testLoader: TestLoader ) {
    super(scoreRepository);
  }

  async load(item: Score): Promise<Score> {
    item.test = await this._testLoader.loadById(item.testId);
    return item;
  }

  async loadById(id: number): Promise<Score> {
    const item = await this.scoreRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByTest(test: Test): Promise<List<Score>> {
    const scores = await this.scoreRepository.listAsync({testId: test.id});
    for (const score of scores) {
      await this.load(score);
    }
    return scores;
  }
}
