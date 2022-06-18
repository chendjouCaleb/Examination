import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {Department, Year, YearDepartment} from 'examination/entities';
import {UserHttpClient, YearDepartmentHttpClient} from 'examination/models/http';
import {DepartmentLoader} from "../organisation";
import {YearLoader} from "./year.loader";


@Injectable({providedIn: 'root'})
export class YearDepartmentLoader extends Loader<YearDepartment, number> {

  constructor( _httpClient: YearDepartmentHttpClient,
               private _userHttClient: UserHttpClient,
               private _yearLoader: YearLoader,
               private _departmentLoader: DepartmentLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: YearDepartment): Promise<YearDepartment> {
    await this._departmentLoader.load(item.department);
    item.year = await this._yearLoader.loadById(item.yearId);
    return item;
  }

  async loadById(id: number): Promise<YearDepartment> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<YearDepartment[]> {
    if (!department.yearDepartments) {
      const yearDepartments = await this._httpClient.listAsync({departmentId: department.id});
      for (const item of yearDepartments) {
        await this.load(item);
      }
      department.yearDepartments = yearDepartments.toArray();
    }
    return department.yearDepartments.slice();
  }


  async loadByYear(year: Year): Promise<YearDepartment[]> {
    if (!year.yearDepartments) {
      const yearDepartments = await this._httpClient.listAsync({yearId: year.id});
      for (const item of yearDepartments) {
        await this.load(item);
      }
      year.yearDepartments = yearDepartments.toArray();
      return yearDepartments.toArray();
    }
    return year.yearDepartments.slice();
  }
}
