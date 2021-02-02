import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LevelLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Level} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class LevelResolver {

  constructor(private _loader: LevelLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Level> {
    if (!route.paramMap.has('levelId')) {
      throw new Error('The current route dont have a parameter named \'levelId\' ');
    }
    const id = +route.paramMap.get('levelId');

    const item = await this._loader.loadById(id);
    this.items.put('level', item);
    return item;

  }
}
