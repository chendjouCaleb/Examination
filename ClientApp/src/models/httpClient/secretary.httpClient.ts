import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Secretary, Examination} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class SecretaryHttpClient extends GenericHttpClient<Secretary, number> {
  url: string = SERVER_URL + '/secretaries';

  createFromAny(value: any): Secretary {
    return new Secretary(value);
  }

  async listByExamination(examination: Examination): Promise<List<Secretary>> {
    return this.list({examinationId: examination.id});
  }


}
