import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {YearDepartmentLoader} from '@examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {YearDepartment} from 'examination/entities';
import {YearDepartmentHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class YearDepartmentResolver {

  constructor(private _loader: YearDepartmentLoader,
              private _httpClient: YearDepartmentHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<YearDepartment> {
    if (!route.paramMap.has('yearDepartmentId')) {
      throw new Error('The current route dont have a parameter named \'yearDepartmentId\' ');
    }
    const id = +route.paramMap.get('yearDepartmentId');

    const yearDepartment = await this._httpClient.findAsync(id);
    await this._loader.load(yearDepartment);

    this.items.put('yearDepartment', yearDepartment);
    return yearDepartment;
  }
}
