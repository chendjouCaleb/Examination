import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {DepartmentLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Department} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class DepartmentResolver {

  constructor(private _loader: DepartmentLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Department> {
    if (!route.paramMap.has('departmentId')) {
      throw new Error('The current route dont have a parameter named \'departmentId\' ');
    }
    const id = +route.paramMap.get('departmentId');

    const item = await this._loader.loadById(id);
    this.items.put('department', item);
    return item;

  }
}
