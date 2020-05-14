import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Admin, Organisation} from '../entities';
import {Injectable} from '@angular/core';


@Injectable()
export class AdminHttpClient extends GenericHttpClient<Admin, number> {
  url: string = SERVER_URL + '/admins';


  createFromAny(value: any): Admin {
    return new Admin(value);
  }

  async findByUserId(organisation: Organisation, userId: string): Promise<Admin> {
    const result = this.httpClient.get(`${this.url}/find?organisationId=${organisation.id}&user=${userId}`).toPromise();
    if (result) {
      return new Admin(result);
    }
    return null;
  }


}
