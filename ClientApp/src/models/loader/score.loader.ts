import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Score, Test, TestGroup} from '../entities';
import {ScoreHttpClient, UserHttpClient} from '../httpClient';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';
import {List} from "@positon/collections";


@Injectable({providedIn: 'root'})
export class ScoreLoader implements EntityLoader<Score, number> {

  constructor(private scoreRepository: ScoreHttpClient, private _testLoader: TestLoader ) {
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
