import {Component} from '@angular/core';
import {Organisation} from 'src/models';
import {CurrentItems} from '../../../current-items';

@Component({
  templateUrl: 'organisation-home.page.html'
})
export class OrganisationHomePage {
  organisation: Organisation;

  constructor(private _items: CurrentItems) {
    this.organisation = this._items.get('organisation');
  }

}
