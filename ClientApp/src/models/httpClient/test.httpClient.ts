import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Examination, Speciality, Test} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {ExpectedPeriodModel, TestAddModel, TestEditDateBody} from 'examination/models';


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

  listByExamination(examination: Examination): Promise<List<Test>> {
    return this.listAsync({examinationId: examination.id});
  }


  listBySpeciality(speciality: Speciality): Promise<List<Test>> {
    return this.listAsync({specialityId: speciality.id});
  }


  addTest(model: TestAddModel, examination: Examination, speciality: Speciality): Promise<Test> {
    const params: any = {examinationId: examination.id};
    if (speciality) {
      params.specialityId = speciality.id;
    }
    return this.add(model, params);
  }

  changeDates(test: Test, model: TestEditDateBody): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${test.id}/dates`, model).toPromise();
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
    return this.httpClient.put<void>(`${this.url}/${test.id}/coefficient`, {}, {params:{coefficient}}).toPromise();
  }

}
