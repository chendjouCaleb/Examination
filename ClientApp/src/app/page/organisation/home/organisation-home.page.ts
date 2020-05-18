import {Component, OnInit} from '@angular/core';
import {Organisation, User, UserHttpClient} from 'src/models';
import {CurrentItems} from '../../../current-items';
import {ELEMENT_DATA, ELEMENT_TYPES, PeriodicElement} from 'examination/app/element';
import {groupBy} from '../../../../controls/array';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'organisation-home.page.html'
})
export class OrganisationHomePage implements OnInit{
  organisation: Organisation;

  items: PeriodicElement[];

  values: any;

  groups = ELEMENT_TYPES;
  itemMap = groupBy(ELEMENT_DATA, 'type');

  users = new List<User>();

  constructor(private _items: CurrentItems, private _httpClient: UserHttpClient) {
    this.organisation = this._items.get('organisation');
    this.items = ELEMENT_DATA.slice(0, 3);
  }

  get valuesStr() {
    return JSON.stringify(this.values);
  }

  async ngOnInit() {
    this.users = await this._httpClient.list();
  }

}
