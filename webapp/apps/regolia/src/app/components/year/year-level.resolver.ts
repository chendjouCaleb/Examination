import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {YearLevelLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {YearLevel} from 'examination/entities';
import {YearLevelHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class YearLevelResolver {

  constructor(private _loader: YearLevelLoader,
              private _httpClient: YearLevelHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<YearLevel> {
    if (!route.paramMap.has('yearLevelId')) {
      throw new Error('The current route dont have a parameter named \'yearLevelId\' ');
    }
    const id = +route.paramMap.get('yearLevelId');

    const yearLevel = await this._httpClient.findAsync(id);
    await this._loader.load(yearLevel);

    this.items.put('yearLevel', yearLevel);
    return yearLevel;
  }
}
