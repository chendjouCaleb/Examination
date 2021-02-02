import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SpecialityLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Speciality} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class SpecialityResolver {

  constructor(private _loader: SpecialityLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Speciality> {
    if (!route.paramMap.has('specialityId')) {
      throw new Error('The current route dont have a parameter named \'specialityId\' ');
    }
    const id = +route.paramMap.get('specialityId');

    const item = await this._loader.loadById(id);
    this.items.put('speciality', item);
    return item;

  }
}
