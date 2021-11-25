import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SemesterLevelLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterLevel} from 'examination/entities';
import {SemesterLevelHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class SemesterLevelResolver {

  constructor(private _loader: SemesterLevelLoader,
              private _httpClient: SemesterLevelHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<SemesterLevel> {
    if (!route.paramMap.has('semesterLevelId')) {
      throw new Error('The current route dont have a parameter named \'semesterLevelId\' ');
    }
    const id = +route.paramMap.get('semesterLevelId');

    const semesterLevel = await this._httpClient.findAsync(id);
    await this._loader.load(semesterLevel);

    this.items.put('semesterLevel', semesterLevel);
    return semesterLevel;
  }
}
