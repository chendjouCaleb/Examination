import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";
import {Paper, Test} from "examination/entities";

export const PAPER_SERVICE_TOKEN =
  new InjectionToken<IPaperService>('PAPER_SERVICE_TOKEN');

export interface IPaperService {
  changePresentState(paper: Paper): Promise<void>;

  details(paper: Paper);

  editDates(paper: Paper): Observable<Paper>;

  supervisorComment(paper: Paper): Observable<Paper>;

  report(paper: Paper): Observable<Paper>;

  scores(paper: Paper): Observable<Paper>;

  collect(paper: Paper): Promise<void>;

  addPapers(test: Test): Promise<void>;

  group(test: Test): Promise<number>;
}
