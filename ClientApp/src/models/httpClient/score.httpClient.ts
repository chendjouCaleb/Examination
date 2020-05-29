import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Group, Room, Test, Score} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {ScoreAddModel} from 'examination/models';


@Injectable()
export class ScoreHttpClient extends GenericHttpClient<Score, number> {
  url: string = SERVER_URL + '/scores';

  createFromAny(value: any): Score {
    return new Score(value);
  }

  listByTest(test: Test): Promise<List<Score>> {
    return this.listAsync({testId: test.id});
  }

  addScore(model: ScoreAddModel, test: Test): Promise<Score> {
    return this.add(model, {testId: test.id});
  }

}
