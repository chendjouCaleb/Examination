import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {YearLevelSpecialityLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {YearLevelSpeciality} from 'examination/entities';
import {YearLevelSpecialityHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class YearLevelSpecialityResolver {

  constructor(private _loader: YearLevelSpecialityLoader,
              private _httpClient: YearLevelSpecialityHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<YearLevelSpeciality> {
    if (!route.paramMap.has('yearLevelSpecialityId')) {
      throw new Error('The current route dont have a parameter named \'yearLevelSpecialityId\' ');
    }
    const id = +route.paramMap.get('yearLevelSpecialityId');

    const yearLevelSpeciality = await this._httpClient.findAsync(id);
    await this._loader.load(yearLevelSpeciality);

    this.items.put('yearLevelSpeciality', yearLevelSpeciality);
    return yearLevelSpeciality;
  }
}
