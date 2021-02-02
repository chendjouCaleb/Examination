import {TestLevelSpeciality, TestLevelSpecialityLoader} from 'examination/models';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';

@Injectable({
  providedIn: 'root'
})
export class TestLevelSpecialityResolver {

  constructor(private _loader: TestLevelSpecialityLoader, private items: CurrentItems) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<TestLevelSpeciality> {
    const id = +route.paramMap.get('testLevelSpecialityId');

    const item = await this._loader.loadById(id);
    this.items.put('testLevelSpeciality', item);

    return item;

  }
}
