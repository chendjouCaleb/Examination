import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {RoomLoader} from 'examination/loaders';
import {CurrentItems} from 'examination/app/current-items';
import {Room} from 'examination/entities';

@Injectable({
  providedIn: 'root'
})
export class RoomResolver {

  constructor(private _loader: RoomLoader,
              private items: CurrentItems) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Room> {
    const id = +route.paramMap.get('roomId');

    const item = await this._loader.loadById(id);
    this.items.put('room', item);

    return item;

  }
}
