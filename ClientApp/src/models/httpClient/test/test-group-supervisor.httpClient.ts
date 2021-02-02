import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Supervisor, Test, TestGroup, TestGroupSupervisor} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class TestGroupSupervisorHttpClient extends GenericHttpClient<TestGroupSupervisor, number> {
  url: string = SERVER_URL + '/testGroupSupervisors';


  createFromAny(value: any): TestGroupSupervisor {
    return new TestGroupSupervisor(value);
  }


  listByTest(test: Test): Promise<List<TestGroupSupervisor>> {
    return this.listAsync({testId: test.id});
  }

  listByTestGroup(testGroup: TestGroup): Promise<List<TestGroupSupervisor>> {
    return this.listAsync({testGroupId: testGroup.id});
  }

  listBySupervisor(supervisor: Supervisor): Promise<List<TestGroupSupervisor>> {
    return this.listAsync({supervisorId: supervisor.id});
  }

  addTestGroupSupervisor(testGroup: TestGroup, supervisor: Supervisor, isPrincipal: boolean): Promise<TestGroupSupervisor> {
    return this.add({}, {testGroupId: testGroup.id, supervisorId: supervisor.id, isPrincipal});
  }

  principalState(testGroupSupervisor: TestGroupSupervisor): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${testGroupSupervisor.id}/principal`, {}).toPromise();
  }
}
