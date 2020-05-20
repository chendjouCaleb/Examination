import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Examination, Student, Speciality, Group} from "../entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";


@Injectable()
export class StudentHttpClient extends GenericHttpClient<Student, number> {
  url: string = SERVER_URL + "/students";


  createFromAny(value: any): Student {
    return new Student(value);
  }

  async findByRegistrationId(examination: Examination, registrationId: string): Promise<Student> {
    const result = this.httpClient
      .get(`${this.url}/find?examinationId=${examination.id}&registrationId=${registrationId}`).toPromise();
    if (result) {
      return new Student(result);
    }
    return null;
  }

  listByExamination(examination: Examination): Promise<List<Student>> {
    return this.listAsync({examinationId: examination.id});
  }


  listBySpeciality(speciality: Speciality): Promise<List<Student>> {
    return this.listAsync({specialityId: speciality.id});
  }

  listByGroup(group: Group): Promise<List<Student>> {
    return this.listAsync({groupId: group.id});
  }

  async changeUserId(student: Student, userId: string) {
    return this.httpClient.put(`${this.url}/${student.id}/userId`, {}, {params: {userId}})
      .toPromise();
  }

  async changeRegistrationId(student: Student, registrationId: string) {
    return this.httpClient.put(`${this.url}/${student.id}/registrationId`, {}, {params: {registrationId}})
      .toPromise();
  }


  async changeSpeciality(student: Student, speciality: Speciality) {
    return this.httpClient.put(`${this.url}/${student.id}/speciality`, {},
      {params: {specialityId: speciality.id.toString()}}
    )
      .toPromise();
  }

  async removeSpeciality(student: Student) {
    return this.httpClient.put(`${this.url}/${student.id}/speciality`, {} ).toPromise();
  }
}
