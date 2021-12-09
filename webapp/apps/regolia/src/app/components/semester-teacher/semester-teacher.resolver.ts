import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SemesterTeacherLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterTeacher} from 'examination/entities';
import {SemesterTeacherHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class SemesterTeacherResolver {

  constructor(private _loader: SemesterTeacherLoader,
              private _httpClient: SemesterTeacherHttpClient,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<SemesterTeacher> {
    if (!route.paramMap.has('semesterTeacherId')) {
      throw new Error('The current route dont have a parameter named \'semesterTeacherId\' ');
    }
    const id = +route.paramMap.get('semesterTeacherId');

    const semesterTeacher = await this._httpClient.findAsync(id);
    await this._loader.load(semesterTeacher);

    this.items.put('semesterTeacher', semesterTeacher);
    return semesterTeacher;
  }
}
