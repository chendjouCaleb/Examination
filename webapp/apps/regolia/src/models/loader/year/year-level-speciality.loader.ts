import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {LevelSpeciality, YearLevel, YearLevelSpeciality, YearSpeciality} from 'examination/entities';
import {UserHttpClient, YearLevelSpecialityHttpClient} from 'examination/models/http';
import {LevelSpecialityLoader, SpecialityLoader} from "../organisation";
import {YearLevelLoader} from "./year-level.loader";
import {YearSpecialityLoader} from "./year-speciality.loader";


@Injectable({providedIn: 'root'})
export class YearLevelSpecialityLoader extends Loader<YearLevelSpeciality, number> {

  constructor( _httpClient: YearLevelSpecialityHttpClient,
               private _userHttClient: UserHttpClient,
               private _yearLevelLoader: YearLevelLoader,
               private _yearSpecialityLoader: YearSpecialityLoader,
               private _specialityLoader: SpecialityLoader,
               private _levelSpecialityLoader: LevelSpecialityLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: YearLevelSpeciality): Promise<YearLevelSpeciality> {
    item.yearSpeciality = await this._yearSpecialityLoader.loadById(item.yearSpecialityId);
    item.yearLevel = await this._yearLevelLoader.loadById(item.yearLevelId);
    await this._levelSpecialityLoader.load(item.levelSpeciality);

    return item;
  }

  async loadById(id: number): Promise<YearLevelSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByYearSpeciality(yearSpeciality: YearSpeciality): Promise<void> {
    if (!yearSpeciality.yearLevelSpecialities) {
      const yearLevelsSpecialities = await this._httpClient.listAsync({yearSpecialityId: yearSpeciality.id});
      for (const item of yearLevelsSpecialities) {
        await this.load(item);
      }
      yearSpeciality.yearLevelSpecialities = yearLevelsSpecialities.toArray();
    }
  }

  async loadByYearLevel(yearLevel: YearLevel): Promise<void> {
    if (!yearLevel.yearLevelSpecialities) {
      const yearLevelsSpecialities = await this._httpClient.listAsync({yearLevelId: yearLevel.id});
      for (const item of yearLevelsSpecialities) {
        await this.load(item);
      }
      yearLevel.yearLevelSpecialities = yearLevelsSpecialities.toArray();
    }
  }


  async loadByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<void> {
    if (!levelSpeciality.yearLevelSpecialities) {
      const yearLevelsSpecialities = await this._httpClient.listAsync({levelSpecialityId: levelSpeciality.id});
      for (const item of yearLevelsSpecialities) {
        await this.load(item);
      }
      levelSpeciality.yearLevelSpecialities = yearLevelsSpecialities.toArray();
    }
  }

}
