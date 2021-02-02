import {Injectable} from '@angular/core';
import {EntityLoader} from '../entity-loader.interface';
import {SchoolLoader} from '../organisation';
import {Planner, School} from 'examination/entities';
import {PlannerHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class PlannerLoader implements EntityLoader<Planner, number> {

  constructor(private plannerRepository: PlannerHttpClient,
              private _userHttClient: UserHttpClient,
              private _schoolLoader: SchoolLoader) {
  }

  async load(item: Planner): Promise<Planner> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    item.school = await this._schoolLoader.loadById(item.schoolId);
    return item;
  }

  async loadById(id: number): Promise<Planner> {
    const item = await this.plannerRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadBySchool(school: School): Promise<void> {
    if (!school.planners) {
      const planners = await this.plannerRepository.list({schoolId: school.id});
      for (const planner of planners) {
        await this.load(planner);
        planner.school = school;
      }
      school.planners = planners;
    }
  }
}
