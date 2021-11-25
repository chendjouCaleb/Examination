import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SemesterDepartmentLoader, YearDepartmentLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterDepartment, YearDepartment} from 'examination/entities';
import {SemesterDepartmentHttpClient, YearDepartmentHttpClient} from '@examination/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class SemesterDepartmentResolver {

  constructor(private _loader: SemesterDepartmentLoader,
              private _httpClient: SemesterDepartmentHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<SemesterDepartment> {
    if (!route.paramMap.has('semesterDepartmentId')) {
      throw new Error('The current route dont have a parameter named \'semesterDepartmentId\' ');
    }
    const id = +route.paramMap.get('semesterDepartmentId');

    const semesterDepartment = await this._httpClient.findAsync(id);
    await this._loader.load(semesterDepartment);

    this.items.put('semesterDepartment', semesterDepartment);
    return semesterDepartment;
  }
}
