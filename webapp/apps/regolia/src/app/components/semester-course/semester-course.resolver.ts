import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterCourseLoader} from "@examination/loaders";
import {SemesterCourse} from "@examination/entities";

@Injectable({
  providedIn: 'root'
})
export class SemesterCourseResolver {

  constructor(private _loader: SemesterCourseLoader, private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SemesterCourse> {
    if (!route.paramMap.has('semesterCourseId')) {
      throw new Error('The current route dont have a parameter named \'semesterCourseId\' ');
    }
    const id = +route.paramMap.get('semesterCourseId');

    const item = await this._loader.loadById(id);
    this.items.put('semesterCourse', item);
    return item;
  }
}
