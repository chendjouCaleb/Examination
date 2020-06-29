import {Observable} from "rxjs";
import {
  Examination,
  Score,
  Speciality,
  Test,
  TestGroup,
  TestGroupCorrector, TestGroupSecretary,
  TestGroupSupervisor
} from "examination/models";
import {InjectionToken} from "@angular/core";
import {List} from "@positon/collections";

export const TEST_SERVICE_TOKEN =
  new InjectionToken<ITestService>('TEST_SERVICE_TOKEN');


export interface ITestService {
  readonly onremove: Observable<Test>;
  readonly onnew: Observable<Test>;

  add(examination: Examination, speciality?: Speciality): Observable<Test>;

  edit(test: Test): Observable<Test>;

  editDate(test: Test): Observable<Test>;

  setAnonymous(test: Test): Promise<Test>;

  unsetAnonymous(test: Test): Promise<Test>;

  delete(test: Test): void;

  addScore(test: Test): Observable<Score>;

  deleteScore(score: Score): void;

  testGroupDetails(testGroup: TestGroup): void;

  addTestGroupCorrectors(testGroup: TestGroup): Observable<List<TestGroupCorrector>>

  addTestGroupSupervisors(testGroup: TestGroup): Observable<List<TestGroupSupervisor>>

  addTestGroupSecretaries(testGroup: TestGroup): Observable<List<TestGroupSecretary>>

  removeTestGroupCorrector(testGroup: TestGroup, testGroupCorrector: TestGroupCorrector):Promise<void>;

  removeTestGroupSupervisor(testGroupSupervisor: TestGroupSupervisor):Promise<void>;

  removeTestGroupSecretary(testGroupSecretary: TestGroupSecretary):Promise<void>;

}
