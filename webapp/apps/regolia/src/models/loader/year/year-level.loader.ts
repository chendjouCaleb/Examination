import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {Level, Year, YearDepartment, YearLevel} from 'examination/entities';
import {UserHttpClient, YearLevelHttpClient} from 'examination/models/http';
import {LevelLoader} from "../organisation";
import {YearLoader} from "./year.loader";
import {YearDepartmentLoader} from "./year-department.loader";


@Injectable({providedIn: 'root'})
export class YearLevelLoader extends Loader<YearLevel, number> {

  constructor( _httpClient: YearLevelHttpClient,
               private _userHttClient: UserHttpClient,
               private _yearDepartmentLoader: YearDepartmentLoader,
               private _levelLoader: LevelLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: YearLevel): Promise<YearLevel> {
    item.level = await this._levelLoader.loadById(item.levelId);
    item.yearDepartment = await this._yearDepartmentLoader.loadById(item.yearDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<YearLevel> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByLevel(level: Level): Promise<void> {
    if (!level.yearLevels) {
      const yearLevels = await this._httpClient.listAsync({levelId: level.id});
      for (const item of yearLevels) {
        await this.load(item);
      }
      level.yearLevels = yearLevels.toArray();
    }
  }


  async loadByYearDepartment(yearDepartment: YearDepartment): Promise<void> {
    if (!yearDepartment.yearLevels) {
      const yearLevels = await this._httpClient.listAsync({yearDepartmentId: yearDepartment.id});
      for (const item of yearLevels) {
        await this.load(item);
      }
      yearDepartment.yearLevels = yearLevels.toArray();
    }
  }
}
