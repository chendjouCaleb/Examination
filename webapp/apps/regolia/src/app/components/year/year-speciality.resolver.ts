import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {YearSpecialityLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {YearSpeciality} from 'examination/entities';
import {YearSpecialityHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class YearSpecialityResolver {

  constructor(private _loader: YearSpecialityLoader,
              private _httpClient: YearSpecialityHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<YearSpeciality> {
    if (!route.paramMap.has('yearSpecialityId')) {
      throw new Error('The current route dont have a parameter named \'yearSpecialityId\' ');
    }
    const id = +route.paramMap.get('yearSpecialityId');

    const yearSpeciality = await this._httpClient.findAsync(id);
    await this._loader.load(yearSpeciality);

    this.items.put('yearSpeciality', yearSpeciality);
    return yearSpeciality;
  }
}
