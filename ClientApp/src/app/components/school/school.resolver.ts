import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SchoolLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {School} from 'examination/entities';
import {PlannerHttpClient} from 'examination/models/http';
import {AuthorizationManager} from 'examination/app/authorization';

@Injectable({
  providedIn: 'root'
})
export class SchoolResolver {

  constructor(private _loader: SchoolLoader,
              private _plannerHttpClient: PlannerHttpClient,
              private _auth: AuthorizationManager,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<School> {
    if (!route.paramMap.has('schoolId')) {
      throw new Error('The current route dont have a parameter named \'schoolId\' ');
    }
    const id = +route.paramMap.get('schoolId');

    const item = await this._loader.loadById(id);

    this._auth.getAuthorizationState().then(async isAuth => {
      if (isAuth) {
        item.userPrincipal.isPlanner = await this._plannerHttpClient.isPlanner(item, this._auth.user.id);
        item.userPrincipal.isPrincipal = item.principalUserId === this._auth.user.id;
      }
    });

    this.items.put('school', item);
    return item;
  }
}
