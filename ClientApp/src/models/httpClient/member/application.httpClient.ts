import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Application, Department, Level, LevelSpeciality, School, Speciality} from 'examination/entities';
import {ApplicationAddBody, ApplicationAddParams} from '../../form';


@Injectable()
export class ApplicationHttpClient extends GenericHttpClient<Application, number> {
  url: string = SERVER_URL + '/applications';


  createFromAny(value: any): Application {
    return new Application(value);
  }

  async findByRegistrationId(level: Level, registrationId: string): Promise<Application> {
    const result = this.httpClient
      .get(`${this.url}/find/registrationId?levelId=${level.id}&registrationId=${registrationId}`).toPromise();
    if (result) {
      return new Application(result);
    }
    return null;
  }

  async findByRegistrationIdInSchool(school: School, registrationId: string): Promise<Application> {
    const result = this.httpClient
      .get(`${this.url}/find/registrationId?schoolId=${school.id}&registrationId=${registrationId}`).toPromise();
    if (result) {
      return new Application(result);
    }
    return null;
  }

  listByLevel(level: Level): Promise<List<Application>> {
    return this.listAsync({levelId: level.id});
  }

  listByUserId(userId: string): Promise<List<Application>> {
    return this.listAsync({userId});
  }

  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<Application>> {
    return this.listAsync({levelSpecialityId: levelSpeciality.id});
  }

  listByDepartment(department: Department): Promise<List<Application>> {
    return this.listAsync({departmentId: department.id});
  }

  listBySpeciality(speciality: Speciality): Promise<List<Application>> {
    return this.listAsync({specialityId: speciality.id});
  }

  addApplication(body: ApplicationAddBody, params: ApplicationAddParams): Promise<Application> {
    return this.add(body, params);
  }

  updateApplication(application: Application, body: ApplicationAddBody): Promise<Application> {
    return this.update(application.id, body);
  }

  async changeSpeciality(application: Application, levelSpeciality: LevelSpeciality) {
    return this.httpClient.put(`${this.url}/${application.id}/levelSpeciality`, {},
      {params: {levelSpecialityId: levelSpeciality.id.toString()}}
    )
      .toPromise();
  }

  async removeSpeciality(application: Application) {
    return this.httpClient.delete(`${this.url}/${application.id}/levelSpeciality`, {}).toPromise();
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
