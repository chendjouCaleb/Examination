import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {
  LevelSpeciality,
  SemesterLevel,
  SemesterLevelSpeciality,
  SemesterSpeciality,
  YearLevelSpeciality
} from 'examination/entities';
import {SemesterLevelSpecialityHttpClient, UserHttpClient} from 'examination/models/http';
import {LevelLoader, SpecialityLoader} from "../organisation";
import {SemesterLevelLoader} from "./semester-level.loader";
import {SemesterSpecialityLoader} from "./semester-speciality.loader";
import {YearLevelSpecialityLoader} from "../year";


@Injectable({providedIn: 'root'})
export class SemesterLevelSpecialityLoader extends Loader<SemesterLevelSpeciality, number> {

  constructor( _httpClient: SemesterLevelSpecialityHttpClient,
               private _userHttClient: UserHttpClient,
               private _semesterLevelLoader: SemesterLevelLoader,
               private _semesterSpecialityLoader: SemesterSpecialityLoader,
               private _levelLoader: LevelLoader,
               private _specialityLoader: SpecialityLoader,
               private _yearLevelSpecialityLoader: YearLevelSpecialityLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: SemesterLevelSpeciality): Promise<SemesterLevelSpeciality> {
    item.semesterSpeciality = await this._semesterSpecialityLoader.loadById(item.semesterSpecialityId);
    item.semesterLevel = await this._semesterLevelLoader.loadById(item.semesterLevelId);
    item.yearLevelSpeciality = await this._yearLevelSpecialityLoader.loadById(item.yearLevelSpecialityId);
    return item;
  }

  async loadById(id: number): Promise<SemesterLevelSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadBySemesterSpeciality(semesterSpeciality: SemesterSpeciality): Promise<void> {
    if (!semesterSpeciality.semesterLevelSpecialities) {
      const semesterLevelsSpecialities = await this._httpClient.listAsync({semesterSpecialityId: semesterSpeciality.id});
      for (const item of semesterLevelsSpecialities) {
        await this.load(item);
      }
      semesterSpeciality.semesterLevelSpecialities = semesterLevelsSpecialities.toArray();
    }
  }

  async loadBySemesterLevel(semesterLevel: SemesterLevel): Promise<void> {
    if (!semesterLevel.semesterLevelSpecialities) {
      const semesterLevelsSpecialities = await this._httpClient.listAsync({semesterLevelId: semesterLevel.id});
      for (const item of semesterLevelsSpecialities) {
        await this.load(item);
      }
      semesterLevel.semesterLevelSpecialities = semesterLevelsSpecialities.toArray();
    }
  }


  async loadByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<void> {
    if (!levelSpeciality.semesterLevelSpecialities) {
      const semesterLevelsSpecialities = await this._httpClient.listAsync({levelSpecialityId: levelSpeciality.id});
      for (const item of semesterLevelsSpecialities) {
        await this.load(item);
      }
      levelSpeciality.semesterLevelSpecialities = semesterLevelsSpecialities.toArray();
    }
  }

  async loadByYearLevelSpeciality(yearLevelSpeciality: YearLevelSpeciality): Promise<void> {
    if (!yearLevelSpeciality.semesterLevelSpecialities) {
      const semesterLevelsSpecialities = await this._httpClient.listAsync({yearLevelSpecialityId: yearLevelSpeciality.id});
      for (const item of semesterLevelsSpecialities) {
        await this.load(item);
      }
      yearLevelSpeciality.semesterLevelSpecialities = semesterLevelsSpecialities.toArray();
    }
  }

}
