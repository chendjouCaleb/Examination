import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {TeacherLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Teacher} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class TeacherResolver {

  constructor(private _loader: TeacherLoader,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Teacher> {
    const id = +route.paramMap.get('teacherId');

    const item = await this._loader.loadById(id);
    this.items.put('teacher', item);

    return item;

  }
}
