import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Examination, Organisation} from "../entities";
import {Injectable} from "@angular/core";


@Injectable()
export class ExaminationHttpClient extends GenericHttpClient<Examination, number> {
  url: string = SERVER_URL + "/examinations";


  createFromAny(value: any): Examination {
    return new Examination(value);
  }

  async findByName(organisation: Organisation, name: string): Promise<Examination> {
    const result = this.httpClient.get(`${this.url}/find?organisationId=${organisation.id}&name=${name}`).toPromise();
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

  async changeSpecialityState(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/specialityState`, {}, {params: {name}})
      .toPromise();
  }

  async changeStart(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/start`, {}, {params: {name}})
      .toPromise();
  }

  async changeClose(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/close`, {}, {params: {name}})
      .toPromise();
  }

  async changeRelaunch(examination: Examination): Promise<void> {
    await this
      .httpClient
      .put(`${this.url}/${examination.id}/relaunch`, {}, {params: {name}})
      .toPromise();
  }

}
