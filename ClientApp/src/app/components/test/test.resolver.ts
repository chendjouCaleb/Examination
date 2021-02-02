import {School, Test, TestLoader} from 'examination/models';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CurrentItems} from 'examination/app/current-items';

@Injectable({
  providedIn: 'root'
})
export class TestResolver {

  constructor(private _loader: TestLoader, private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Test> {
    const id = +route.paramMap.get('testId');

    const item: Test = await this._loader.loadById(id);

    const school = this.items.find<School>('school');
    if(school){
      item.isPlanner = school.userPrincipal?.isPlanner;
    }

    this.items.put('test', item);

    return item;

  }
}
