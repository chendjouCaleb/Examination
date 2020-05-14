import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Corrector, Examination} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class CorrectorHttpClient extends GenericHttpClient<Corrector, number> {
  url: string = SERVER_URL + '/correctors';

  createFromAny(value: any): Corrector {
    return new Corrector(value);
  }

  async listByExamination(examination: Examination): Promise<List<Corrector>> {
    return this.list({examinationId: examination.id});
  }


}
