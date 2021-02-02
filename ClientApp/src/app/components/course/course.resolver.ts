import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CourseLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Course} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver {

  constructor(private _loader: CourseLoader, private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Course> {
    if (!route.paramMap.has('courseId')) {
      throw new Error('The current route dont have a parameter named \'courseId\' ');
    }
    const id = +route.paramMap.get('courseId');

    const item = await this._loader.loadById(id);
    this.items.put('course', item);
    return item;
  }
}
