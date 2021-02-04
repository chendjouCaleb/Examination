import {List} from '@positon/collections';
import {Planner, School} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const PLANNER_SERVICE_TOKEN =
  new InjectionToken<IPlannerService>('PLANNER_SERVICE_TOKEN');

export interface IPlannerService {
  addPlanners(school: School): Promise<List<Planner>>;

  deletePlanner(planner: Planner): Promise<boolean>;
}
