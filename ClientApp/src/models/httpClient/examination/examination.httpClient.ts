import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Examination, School} from 'examination/entities';
import {Injectable} from '@angular/core';
import {ExaminationAddModel} from '../../form';


@Injectable()
export class ExaminationHttpClient extends GenericHttpClient<Examination, number> {
  url: string = SERVER_URL + '/examinations';


  createFromAny(value: any): Examination {
    return new Examination(value);
  }

  addExamination(body: ExaminationAddModel, school: School): Promise<Examination> {
    return this.add(body, {schoolId: school.id});
  }

  async findByName(school: School, name: string): Promise<Examination> {
    const result = this.httpClient.get(`${this.url}/find/name?schoolId=${school.id}&name=${name}`).toPromise();
    if (result) {
      return new Examination(result);
    }
    return null;
  }

  async changeStartDate(examination: Examination, startDate: string): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/startDate`, {}, {params: {startDate}})
      .toPromise();
  }


  async changeEndDate(examination: Examination, endDate: string): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/endDate`, {}, {params: {endDate}})
      .toPromise();
  }


  async changeName(examination: Examination, name: string): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/name`, {}, {params: {name}})
      .toPromise();
  }


  async start(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/start`, {})
      .toPromise();
  }

  async close(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/close`, {})
      .toPromise();
  }

  async relaunch(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/relaunch`, {})
      .toPromise();
  }

}
