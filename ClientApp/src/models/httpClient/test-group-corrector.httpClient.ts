import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Corrector, Test, TestGroup, TestGroupCorrector} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class TestGroupCorrectorHttpClient extends GenericHttpClient<TestGroupCorrector, number> {
  url: string = SERVER_URL + '/testGroupCorrectors';


  createFromAny(value: any): TestGroupCorrector {
    return new TestGroupCorrector(value);
  }


  listByTest(test: Test): Promise<List<TestGroupCorrector>> {
    return this.listAsync({testId: test.id});
  }

  listByTestGroup(testGroup: TestGroup): Promise<List<TestGroupCorrector>> {
    return this.listAsync({testGroupId: testGroup.id});
  }


  addTestGroupCorrector(testGroup: TestGroup, corrector: Corrector): Promise<TestGroupCorrector> {
    return this.add({}, {testGroupId: testGroup.id, correctorId: corrector.id});
  }

}
