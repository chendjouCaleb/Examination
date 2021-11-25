import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SemesterSpecialityLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {SemesterSpeciality} from 'examination/entities';
import {SemesterSpecialityHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class SemesterSpecialityResolver {

  constructor(private _loader: SemesterSpecialityLoader,
              private _httpClient: SemesterSpecialityHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<SemesterSpeciality> {
    if (!route.paramMap.has('semesterSpecialityId')) {
      throw new Error('The current route dont have a parameter named \'semesterSpecialityId\' ');
    }
    const id = +route.paramMap.get('semesterSpecialityId');

    const semesterSpeciality = await this._httpClient.findAsync(id);
    await this._loader.load(semesterSpeciality);

    this.items.put('semesterSpeciality', semesterSpeciality);
    return semesterSpeciality;
  }
}
