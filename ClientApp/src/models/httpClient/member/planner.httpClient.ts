import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Planner, School} from 'examination/entities';



@Injectable()
export class PlannerHttpClient extends GenericHttpClient<Planner, number> {
  url: string = SERVER_URL + '/planners';

  createFromAny(value: any): Planner {
    return new Planner(value);
  }

  async listBySchool(school: School): Promise<List<Planner>> {
    return this.list({schoolId: school.id});
  }

  async listByUserId(userId: string): Promise<List<Planner>> {
    return this.list({userId});
  }

  async isPlanner(school: School, userId: string): Promise<boolean> {
    return this.httpClient.get<boolean>(`${this.url}/isPlanner?userId=${userId}&schoolId=${school.id}`).toPromise();
  }


  async addPlanners(school: School, userId: string[]): Promise<List<Planner>> {
    return this.addRange({}, {
      schoolId: school.id,
      userId
    });
  }
}
