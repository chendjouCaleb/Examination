import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterStudent} from "@examination/entities";
import {SemesterStudentLoader} from "../../../models/loader/semester/semester-student.loader";

@Injectable({
  providedIn: 'root'
})
export class SemesterStudentResolver {

  constructor(private _loader: SemesterStudentLoader, private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SemesterStudent> {
    if (!route.paramMap.has('semesterStudentId')) {
      throw new Error('The current route dont have a parameter named \'semesterStudentId\' ');
    }
    const id = +route.paramMap.get('semesterStudentId');

    const item = await this._loader.loadById(id);
    this.items.put('semesterStudent', item);
    return item;
  }
}
