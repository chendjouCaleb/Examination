import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Examination, Principal} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class PrincipalHttpClient extends GenericHttpClient<Principal, number> {
  url: string = SERVER_URL + '/principals';


  createFromAny(value: any): Principal {
    return new Principal(value);
  }

  async listByExamination(examination: Examination): Promise<List<Principal>> {
    return this.list({examinationId: examination.id});
  }


}
