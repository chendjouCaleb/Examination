import {InjectionToken} from "@angular/core";
import {Paper} from "examination/entities";

export const PAPER_SERVICE_TOKEN =
  new InjectionToken<IPaperService>('PAPER_SERVICE_TOKEN');

export interface IPaperService {
  changePresentState(paper: Paper): Promise<void>;
}
