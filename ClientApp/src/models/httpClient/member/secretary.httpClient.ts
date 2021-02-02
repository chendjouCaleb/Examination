import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Secretary, Department} from 'examination/entities';


@Injectable()
export class SecretaryHttpClient extends GenericHttpClient<Secretary, number> {
  url: string = SERVER_URL + '/secretaries';

  createFromAny(value: any): Secretary {
    return new Secretary(value);
  }

  async listByDepartment(department: Department): Promise<List<Secretary>> {
    return this.list({departmentId: department.id});
  }

  async listByUserId(userId: string): Promise<List<Secretary>> {
    return this.list({userId});
  }


  async addSecretaries(department: Department, userId: string[]): Promise<List<Secretary>> {
    return this.addRange({}, {
      departmentId: department.id,
      userId
    });
  }
}
