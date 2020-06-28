import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Group, Room, Test, Score} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {ScoreAddModel} from 'examination/models';


@Injectable()
export class ScorePaperHttpClient extends GenericHttpClient<ScorePaper, number> {
  url: string = SERVER_URL + '/scores';

  createFromAny(value: any): Score {
    return new Score(value);
  }

  listByTest(test: Test): Promise<List<Score>> {
    return this.listAsync({testId: test.id});
  }


}
