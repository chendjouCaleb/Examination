import {GenericHttpClient, SERVER_URL} from '../httpClient';

import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Department, Level, LevelSpeciality, School, Speciality, Student} from 'examination/entities';
import {StudentAddBody, StudentAddParams} from '../../form';


@Injectable()
export class StudentHttpClient extends GenericHttpClient<Student, number> {
  url: string = SERVER_URL + '/students';


  createFromAny(value: any): Student {
    return new Student(value);
  }

  async findByRegistrationId(school: School, registrationId: string): Promise<Student> {
    const result = await this.httpClient
      .get(`${this.url}/find/registrationId?schoolId=${school.id}&registrationId=${registrationId}`)
      .toPromise();
    if (result) {
      return new Student(result);
    }
    return null;
  }

  listByLevel(level: Level): Promise<List<Student>> {
    return this.listAsync({levelId: level.id});
  }

  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<Student>> {
    return this.listAsync({levelSpecialityId: levelSpeciality.id});
  }

  listByDepartment(department: Department): Promise<List<Student>> {
    return this.listAsync({departmentId: department.id});
  }


  listBySpeciality(speciality: Speciality): Promise<List<Student>> {
    return this.listAsync({specialityId: speciality.id});
  }

  listByUserId(userId: string): Promise<List<Student>> {
    return this.listAsync({userId});
  }

  async addStudent(body: StudentAddBody, params: StudentAddParams): Promise<Student> {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key])
    }

    formData.set('image', body.image, 'image.png');

    const result = await this.httpClient.post<Student>(`${this.url}`, formData, {params: params as any}).toPromise();
    return new Student(result);
  }

  async changeUserId(student: Student, userId: string) {
    return this.httpClient.put(`${this.url}/${student.id}/userId`, {}, {params: {userId}})
      .toPromise();
  }

  async removeUserId(student: Student) {
    return this.httpClient.delete(`${this.url}/${student.id}/userId`, {})
      .toPromise();
  }

  async changeRegistrationId(student: Student, registrationId: string) {
    return this.httpClient.put(`${this.url}/${student.id}/registrationId`, {}, {params: {registrationId}})
      .toPromise();
  }


  async changeLevel(student: Student, level: Level, levelSpeciality: LevelSpeciality) {
    return this.httpClient.put(`${this.url}/${student.id}/level`, {},
      {
        params: {
          levelSpecialityId: levelSpeciality.id.toString(),
          levelId: level.id.toString()
        }
      })
      .toPromise();
  }

  async removeLevelSpeciality(student: Student) {
    return this.httpClient.delete(`${this.url}/${student.id}/levelSpeciality`, {}).toPromise();
  }

  getStudentImageUrl(student: Student): string {
    return `${this.url}/${student.id}/image`;
  }
}
