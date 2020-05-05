import {Component} from '@angular/core';
import {Organisation} from 'src/models';
import {CurrentItems} from '../../../current-items';

@Component({
  templateUrl: 'organisation-settings.page.html'
})
export class OrganisationSettingsPage {
  organisation: Organisation;

  constructor(private _items: CurrentItems) {
    this.organisation = this._items.get('organisation');
  }

}
