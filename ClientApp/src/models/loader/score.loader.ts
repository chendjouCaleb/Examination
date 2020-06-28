import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Examination, Score} from '../entities';
import {ScoreHttpClient, UserHttpClient} from '../httpClient';
import {List} from '@positon/collections';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';


@Injectable({providedIn: 'root'})
export class ScoreLoader implements EntityLoader<Score, number> {

  constructor(private scoreRepository: ScoreHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _testLoader: TestLoader,
              private _groupLoader: GroupLoader) {
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

  async loadByExamination(examination: Examination): Promise<List<Score>> {
    const scores = await this.scoreRepository.listAsync({examinationId: examination.id});
    for (const score of scores) {
      await this.load(score);
    }
    return scores;
  }

}
