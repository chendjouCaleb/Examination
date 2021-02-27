import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Teacher, Department} from 'examination/entities';


@Injectable()
export class TeacherHttpClient extends GenericHttpClient<Teacher, number> {
  url: string = SERVER_URL + '/teachers';

  createFromAny(value: any): Teacher {
    return new Teacher(value);
  }

  async listByDepartment(department: Department): Promise<List<Teacher>> {
    return this.list({departmentId: department.id});
  }

  async listByUserId(userId: string): Promise<List<Teacher>> {
    return this.list({userId});
  }


  async addTeachers(department: Department, userId: string[]): Promise<List<Teacher>> {
    return this.addRange({}, {
      departmentId: department.id,
      userId
    });
  }
}
