import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Principal, Department} from 'examination/entities';


@Injectable()
export class PrincipalHttpClient extends GenericHttpClient<Principal, number> {
  url: string = SERVER_URL + '/principals';

  createFromAny(value: any): Principal {
    return new Principal(value);
  }

  async listByDepartment(department: Department): Promise<List<Principal>> {
    return this.list({departmentId: department.id});
  }

  async listByUserId(userId: string): Promise<List<Principal>> {
    return this.list({userId});
  }


  async addPrincipals(department: Department, userId: string[]): Promise<List<Principal>> {
    return this.addRange({}, {
      departmentId: department.id,
      userId
    });
  }
}
