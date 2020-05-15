import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Supervisor, Examination} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class SupervisorHttpClient extends GenericHttpClient<Supervisor, number> {
  url: string = SERVER_URL + '/supervisors';

  createFromAny(value: any): Supervisor {
    return new Supervisor(value);
  }

  async listByExamination(examination: Examination): Promise<List<Supervisor>> {
    return this.list({examinationId: examination.id});
  }


}
