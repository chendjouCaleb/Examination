import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Course, Examination, ExaminationDepartment, ExaminationLevel, ExaminationSpeciality, Test} from 'examination/entities';
import {Injectable} from '@angular/core';
import {TestAddBodyModel, TestAddParams, TestEditBodyModel, TestEditDateBody} from 'examination/models';
import {ItemListResult} from '../itemList';


@Injectable()
export class TestHttpClient extends GenericHttpClient<Test, number> {
  url: string = SERVER_URL + '/tests';


  createFromAny(value: any): Test {
    return new Test(value);
  }

  async findByCode(examination: Examination, code: string): Promise<Test> {
    const result = this.httpClient.get(`${this.url}/find?examinationId=${examination.id}&code=${code}`).toPromise();
    if (result) {
      return new Test(result);
    }
    return null;
  }

  listByCourse(course: Course): Promise<ItemListResult<Test>> {
    return this.itemList({courseId: course.id});
  }

  listByExaminationLevel(examinationLevel: ExaminationLevel): Promise<ItemListResult<Test>> {
    return this.itemList({examinationLevelId: examinationLevel.id});
  }

  listByExaminationSpeciality(examinationSpeciality: ExaminationSpeciality): Promise<ItemListResult<Test>> {
    return this.itemList({examinationSpecialityId: examinationSpeciality.id});
  }

  listByExaminationDepartment(examinationDepartment: ExaminationDepartment): Promise<ItemListResult<Test>> {
    return this.itemList({examinationDepartmentId: examinationDepartment.id});
  }

  listByExamination(examination: Examination): Promise<ItemListResult<Test>> {
    return this.itemList({examinationId: examination.id});
  }


  addTest(body: TestAddBodyModel, params: TestAddParams): Promise<Test> {
    return this.add(body, params);
  }

  editTest(test: Test, body: TestEditBodyModel) {
    return this.update(test.id, body);
  }

  changeDates(test: Test, model: TestEditDateBody): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/dates`, model).toPromise();
  }

  ungroup(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/ungroup`, {}).toPromise();
  }

  canGroupPapers(test: Test): Promise<number> {
    return this.httpClient.put<number>(`${this.url}/${test.id}/canGroupPapers`, {}).toPromise();
  }

  countNonGroupedPapers(test: Test): Promise<number> {
    return this.httpClient.put<number>(`${this.url}/${test.id}/countNonGroupedPapers`, {}).toPromise();
  }

  start(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/start`, {}).toPromise();
  }

  restart(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/restart`, {}).toPromise();
  }

  end(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/end`, {}).toPromise();
  }

  changeCloseState(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/closed`, {}).toPromise();
  }

  published(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/published`, {}).toPromise();
  }

  anonymous(test: Test): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/anonymous`, {}).toPromise();
  }

  name(test: Test, name: string): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/name`, {}, {params: {name}}).toPromise();
  }

  code(test: Test, code: string): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/code`, {}, {params: {code}}).toPromise();
  }

  coefficient(test: Test, coefficient: string): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/coefficient`, {}, {params: {coefficient}}).toPromise();
  }

}
