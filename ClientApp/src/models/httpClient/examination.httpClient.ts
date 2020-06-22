import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Examination, Organisation, Speciality} from "../entities";
import {Injectable} from "@angular/core";
import {ExaminationUser} from "../entities/user-examination";


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

  async examinationUser(examinationId: number, userId: string) {
    return this.httpClient
      .get<ExaminationUser>(`${this.url}/users?examinationId=${examinationId}&userId=${userId}`)
      .toPromise();
  }

  async canGroup(examination: Examination): Promise<number> {
    return this.httpClient
      .get<number>(`${this.url}/canGroupStudents?examinationId=${examination.id}`)
      .toPromise();
  }


  async canGroupNonSpecialityStudents(examination: Examination): Promise<number> {
    return this.httpClient
      .get<number>(`${this.url}/canGroupNonSpecialityStudents?examinationId=${examination.id}`)
      .toPromise();
  }

  async canGroupSpecialityStudents(speciality: Speciality): Promise<number> {
    return this.httpClient
      .get<number>(`${this.url}/canGroupNonSpecialityStudents?specialityId=${speciality.id}`)
      .toPromise();
  }


}
