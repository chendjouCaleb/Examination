import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LevelSpecialityLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {LevelSpeciality} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class LevelSpecialityResolver {

  constructor(private _loader: LevelSpecialityLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<LevelSpeciality> {
    if (!route.paramMap.has('levelSpecialityId')) {
      throw new Error('The current route dont have a parameter named \'levelSpecialityId\' ');
    }
    const id = +route.paramMap.get('levelSpecialityId');

    const item = await this._loader.loadById(id);
    this.items.put('levelSpeciality', item);
    return item;

  }
}
