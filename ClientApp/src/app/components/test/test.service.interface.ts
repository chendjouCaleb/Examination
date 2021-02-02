import {Observable} from 'rxjs';
import {
  Course,
  Examination,
  ExaminationDepartment,
  ExaminationLevel,
  Score,
  Test,
  TestLevelSpeciality,
  TestScore
} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const TEST_SERVICE_TOKEN =
  new InjectionToken<ITestService>('TEST_SERVICE_TOKEN');

export interface ITestAddParams {
  examination?: Examination;
  examinationDepartment?: ExaminationDepartment;
  examinationLevel?: ExaminationLevel,
  course?: Course
}

export interface ITestService {
  readonly onRemove: Observable<Test>;
  readonly onNew: Observable<Test>;

  details(test: Test);

  detailsTestLevelSpeciality(item: TestLevelSpeciality);

  add(params: ITestAddParams): Observable<Test>;

  edit(test: Test): Observable<Test>;

  editDate(test: Test): Observable<Test>;

  setAnonymous(test: Test): Promise<Test>;

  publish(test: Test): Observable<void>;

  unsetAnonymous(test: Test): Promise<Test>;

  delete(test: Test): Promise<boolean>;

  addScore(test: Test): Promise<Score>;

  deleteScore(score: TestScore): Promise<boolean>;

  start(test: Test): Promise<void>;

  end(test: Test): Promise<void>;

  restart(test: Test): Promise<void>;

  changeCloseState(test: Test): Promise<void>;
}
