import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {YearLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Year} from 'examination/entities';
import {YearHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class YearResolver {

  constructor(private _loader: YearLoader,
              private _httpClient: YearHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Year> {
    if (!route.paramMap.has('yearId')) {
      throw new Error('The current route dont have a parameter named \'yearId\' ');
    }
    const id = +route.paramMap.get('yearId');

    const year = await this._httpClient.findAsync(id);
    await this._loader.load(year);

    this.items.put('year', year);
    return year;
  }
}
