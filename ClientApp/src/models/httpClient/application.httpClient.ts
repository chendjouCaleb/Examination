import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Application, Examination, Speciality} from "../entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";


@Injectable()
export class ApplicationHttpClient extends GenericHttpClient<Application, number> {
  url: string = SERVER_URL + "/applications";


  createFromAny(value: any): Application {
    return new Application(value);
  }

  async findByRegistrationId(examination: Examination, registrationId: string): Promise<Application> {
    const result = this.httpClient
      .get(`${this.url}/find?examinationId=${examination.id}&registrationId=${registrationId}`).toPromise();
    if (result) {
      return new Application(result);
    }
    return null;
  }

  listByExamination(examination: Examination): Promise<List<Application>> {
    return this.listAsync({examinationId: examination.id});
  }


  listBySpeciality(speciality: Speciality): Promise<List<Application>> {
    return this.listAsync({specialityId: speciality.id});
  }


  async changeSpeciality(application: Application, speciality: Speciality) {
    return this.httpClient.put(`${this.url}/${application.id}/speciality`, {},
      {params: {specialityId: speciality.id.toString()}}
    )
      .toPromise();
  }

  async removeSpeciality(application: Application) {
    return this.httpClient.put(`${this.url}/${application.id}/removeSpeciality`, {}).toPromise();
  }

  async accept(application: Application): Promise<Application> {
    const result = await this.httpClient.put(`${this.url}/${application.id}/accept`, {}).toPromise();
    return new Application(result);
  }

  async reject(application: Application) {
    return this.httpClient.put(`${this.url}/${application.id}/reject`, {}).toPromise();
  }

  async cancel(application: Application) {
    return this.httpClient.put(`${this.url}/${application.id}/cancel`, {}).toPromise();
  }
}
