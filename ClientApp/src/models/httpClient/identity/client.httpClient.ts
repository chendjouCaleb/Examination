import {GenericHttpClient} from '../httpClient';

import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Client} from "examination/entities/identity";


@Injectable()
export class ClientHttpClient extends GenericHttpClient<Client, string> {
  url: string = environment.AUTH_SERVER_URL + '/clients';


  createFromAny(value: any): Client {
    return Client.createFromAny(value);
  }


  async findByName(name: string): Promise<Client> {
    const result = await this.httpClient.get(this.url + '/find', {params: {name}}).toPromise();
    return result != null ? Client.createFromAny(result) : null;
  }


}

