import {Observable} from 'rxjs';
import {Test, TestGroup, TestGroupCorrector, TestGroupSecretary, TestGroupSupervisor} from 'examination/models';
import {InjectionToken} from '@angular/core';
import {List} from '@positon/collections';

export const TEST_GROUP_SERVICE_TOKEN =
  new InjectionToken<ITestGroupService>('TEST_GROUP_SERVICE_TOKEN');

export interface ITestGroupService {

  add(test: Test): Observable<TestGroup>;

  start(testGroup: TestGroup): Promise<void>;

  end(testGroup: TestGroup): Promise<void>;

  restart(testGroup: TestGroup): Promise<void>;

  delete(testGroup: TestGroup): Promise<boolean>;

  addTestGroupCorrectors(testGroup: TestGroup): Observable<List<TestGroupCorrector>>

  addTestGroupSupervisors(testGroup: TestGroup): Observable<List<TestGroupSupervisor>>

  addTestGroupSecretaries(testGroup: TestGroup): Observable<List<TestGroupSecretary>>

  removeTestGroupCorrector(testGroup: TestGroup, testGroupCorrector: TestGroupCorrector): Promise<boolean>;

  removeTestGroupSupervisor(testGroup: TestGroup, testGroupSupervisor: TestGroupSupervisor): Promise<boolean>;

  removeTestGroupSecretary(testGroup: TestGroup, testGroupSecretary: TestGroupSecretary): Promise<boolean>;

  setPrincipal(item: TestGroupSupervisor): Promise<void>;
}
