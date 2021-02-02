import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Corrector, Department} from 'examination/entities';


@Injectable()
export class CorrectorHttpClient extends GenericHttpClient<Corrector, number> {
  url: string = SERVER_URL + '/correctors';

  createFromAny(value: any): Corrector {
    return new Corrector(value);
  }

  async listByDepartment(department: Department): Promise<List<Corrector>> {
    return this.list({departmentId: department.id});
  }

  async listByUserId(userId: string): Promise<List<Corrector>> {
    return this.list({userId});
  }


  async addCorrectors(department: Department, userId: string[]): Promise<List<Corrector>> {
    return this.addRange({}, {
      departmentId: department.id,
      userId
    });
  }
}
