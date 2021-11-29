import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {Speciality, Year, YearDepartment, YearSpeciality} from 'examination/entities';
import {UserHttpClient, YearSpecialityHttpClient} from 'examination/models/http';
import {SpecialityLoader} from "../organisation";
import {YearLoader} from "./year.loader";
import {YearDepartmentLoader} from "./year-department.loader";


@Injectable({providedIn: 'root'})
export class YearSpecialityLoader extends Loader<YearSpeciality, number> {

  constructor( _httpClient: YearSpecialityHttpClient,
               private _userHttClient: UserHttpClient,
               private _yearDepartmentLoader: YearDepartmentLoader,
               private _specialityLoader: SpecialityLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: YearSpeciality): Promise<YearSpeciality> {
    await this._specialityLoader.load(item.speciality);
    item.yearDepartment = await this._yearDepartmentLoader.loadById(item.yearDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<YearSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadBySpeciality(speciality: Speciality): Promise<void> {
    if (!speciality.yearSpecialities) {
      const yearSpecialities = await this._httpClient.listAsync({specialityId: speciality.id});
      for (const item of yearSpecialities) {
        await this.load(item);
      }
      speciality.yearSpecialities = yearSpecialities.toArray();
    }
  }


  async loadByYearDepartment(yearDepartment: YearDepartment): Promise<void> {
    if (!yearDepartment.yearSpecialities) {
      const yearSpecialities = await this._httpClient.listAsync({yearDepartmentId: yearDepartment.id});
      for (const item of yearSpecialities) {
        await this.load(item);
      }
      yearDepartment.yearSpecialities = yearSpecialities.toArray();
    }
  }
}
