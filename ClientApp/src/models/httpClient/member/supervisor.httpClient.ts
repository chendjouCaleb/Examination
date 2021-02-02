import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Supervisor, Department} from 'examination/entities';


@Injectable()
export class SupervisorHttpClient extends GenericHttpClient<Supervisor, number> {
  url: string = SERVER_URL + '/supervisors';

  createFromAny(value: any): Supervisor {
    return new Supervisor(value);
  }

  async listByDepartment(department: Department): Promise<List<Supervisor>> {
    return this.list({departmentId: department.id});
  }

  async listByUserId(userId: string): Promise<List<Supervisor>> {
    return this.list({userId});
  }


  async addSupervisors(department: Department, userId: string[]): Promise<List<Supervisor>> {
    return this.addRange({}, {
      departmentId: department.id,
      userId
    });
  }
}
