import {GenericHttpClient, SERVER_URL} from './httpClient';
import {Paper, ScorePaper} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';


@Injectable()
export class ScorePaperHttpClient extends GenericHttpClient<ScorePaper, number> {
  url: string = SERVER_URL + '/scorePapers';

  createFromAny(value: any): ScorePaper {
    return new ScorePaper(value);
  }

  listByPaper(paper: Paper): Promise<List<ScorePaper>> {
    return this.listAsync({paperId: paper.id});
  }

}
