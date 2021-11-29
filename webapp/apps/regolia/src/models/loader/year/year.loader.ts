import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {Department, School, Year} from 'examination/entities';
import {YearHttpClient, UserHttpClient} from 'examination/models/http';
import {SchoolLoader} from "../organisation";


@Injectable({providedIn: 'root'})
export class YearLoader extends Loader<Year, number> {

  constructor( _httpClient: YearHttpClient,
               private _userHttClient: UserHttpClient,
               private _schoolLoader: SchoolLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: Year): Promise<Year> {
    await this._schoolLoader.load(item.school);
    return item;
  }

  async loadById(id: number): Promise<Year> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadBySchool(school: School): Promise<void> {
    if (!school.years) {
      const years = await this._httpClient.listAsync({schoolId: school.id});
      for (const item of years) {
        await this.load(item);
      }
      school.years = years.toArray();
    }
  }
}
