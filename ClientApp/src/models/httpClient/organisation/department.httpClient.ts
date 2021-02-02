import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Department, DepartmentUser, School} from 'examination/entities';
import {Injectable} from '@angular/core';
import {DepartmentAddModelBody} from 'examination/models';


@Injectable()
export class DepartmentHttpClient extends GenericHttpClient<Department, number> {
  url: string = SERVER_URL + '/departments';


  createFromAny(value: any): Department {
    return new Department(value);
  }

  async findByAcronym(school: School, acronym: string): Promise<Department> {
    const result = this.httpClient.get(`${this.url}/find/acronym`, {
      params: {schoolId: school.id.toString(), acronym}
    }).toPromise();
    if (result) {
      return new Department(result);
    }
    return null;
  }

  async findByName(school: School, name: string): Promise<Department> {
    const result = this.httpClient.get(`${this.url}/find/name`, {
      params: {schoolId: school.id.toString(), name}
    }).toPromise();
    if (result) {
      return new Department(result);
    }
    return null;
  }


  async addDepartment(school: School, body: DepartmentAddModelBody) {
    return this.add(body, {schoolId: school.id});
  }

  async principal(userId: string) {
    return this.httpClient.put(`${this.url}/principal`, {userId});
  }

  async changeImage(department: Department, image: Blob, extension: string = 'png'): Promise<void> {
    const formData = new FormData();
    formData.append('image', image, `image.${extension}`);
    return this.httpClient.put<void>(`${this.url}/${department.id}/image`, formData).toPromise();
  }

  async changeCoverImage(department: Department, image: Blob, extension: string = 'png'): Promise<void> {
    const formData = new FormData();
    formData.append('image', image, `image.${extension}`);
    return this.httpClient.put<void>(`${this.url}/${department.id}/coverImage`, formData).toPromise();
  }

  getCoverImageUrl(department: Department): string {
    return `${this.url}/${department.id}/coverImage`;
  }

  getImageUrl(department: Department): string {
    return `${this.url}/${department.id}/image`;
  }

  async departmentUser(departmentId: number, userId: string) {
    return this.httpClient
      .get<DepartmentUser>(`${this.url}/users?departmentId=${departmentId}&userId=${userId}`)
      .toPromise();
  }
}
