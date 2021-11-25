import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SemesterLevelSpecialityLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterLevelSpeciality} from 'examination/entities';
import {SemesterLevelSpecialityHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class SemesterLevelSpecialityResolver {

  constructor(private _loader: SemesterLevelSpecialityLoader,
              private _httpClient: SemesterLevelSpecialityHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<SemesterLevelSpeciality> {
    if (!route.paramMap.has('semesterLevelSpecialityId')) {
      throw new Error('The current route dont have a parameter named \'semesterLevelSpecialityId\' ');
    }
    const id = +route.paramMap.get('semesterLevelSpecialityId');

    const semesterLevelSpeciality = await this._httpClient.findAsync(id);
    await this._loader.load(semesterLevelSpeciality);

    this.items.put('semesterLevelSpeciality', semesterLevelSpeciality);
    return semesterLevelSpeciality;
  }
}
