import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Test, TestScore} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {ScoreAddModel} from "../../form";



@Injectable()
export class TestScoreHttpClient extends GenericHttpClient<TestScore, number> {
  url: string = SERVER_URL + '/testScores';

  createFromAny(value: any): TestScore {
    return new TestScore(value);
  }

  listByTest(test: Test): Promise<List<TestScore>> {
    return this.listAsync({testId: test.id});
  }

  async findByName(test: Test, name: string): Promise<TestScore> {
    const result = this.httpClient.get(`${this.url}/find/name?testId=${test.id}&name=${name}`).toPromise();
    if (result) {
      return new TestScore(result);
    }
    return null;
  }

  changeName(testScore: TestScore): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${testScore.id}/name`, {}, {params: {name}}).toPromise();
  }

  addTestScore(model:  ScoreAddModel, test: Test): Promise<TestScore> {
    return this.add(model, {testId: test.id});
  }

}
