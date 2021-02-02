import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Secretary, Test, TestGroup, TestGroupSecretary} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class TestGroupSecretaryHttpClient extends GenericHttpClient<TestGroupSecretary, number> {
  url: string = SERVER_URL + '/testGroupSecretaries';


  createFromAny(value: any): TestGroupSecretary {
    return new TestGroupSecretary(value);
  }


  listByTest(test: Test): Promise<List<TestGroupSecretary>> {
    return this.listAsync({testId: test.id});
  }

  listByTestGroup(testGroup: TestGroup): Promise<List<TestGroupSecretary>> {
    return this.listAsync({testGroupId: testGroup.id});
  }

  listBySecretary(secretary: Secretary): Promise<List<TestGroupSecretary>> {
    return this.listAsync({secretaryId: secretary.id});
  }


  addTestGroupSecretary(testGroup: TestGroup, secretary: Secretary): Promise<TestGroupSecretary> {
    return this.add({}, {testGroupId: testGroup.id, secretaryId: secretary.id});
  }

}
