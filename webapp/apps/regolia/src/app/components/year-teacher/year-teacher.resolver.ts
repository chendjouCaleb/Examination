import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {YearTeacherLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {YearTeacher} from 'examination/entities';
import {YearTeacherHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class YearTeacherResolver {

  constructor(private _loader: YearTeacherLoader,
              private _httpClient: YearTeacherHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<YearTeacher> {
    if (!route.paramMap.has('yearTeacherId')) {
      throw new Error('The current route dont have a parameter named \'yearTeacherId\' ');
    }
    const id = +route.paramMap.get('yearTeacherId');

    const yearTeacher = await this._httpClient.findAsync(id);
    await this._loader.load(yearTeacher);

    this.items.put('yearTeacher', yearTeacher);
    return yearTeacher;
  }
}
