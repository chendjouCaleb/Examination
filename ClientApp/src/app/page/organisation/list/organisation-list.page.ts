import {Component} from '@angular/core';
import {Organisation, OrganisationHttpClient} from 'src/models';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'organisation-list.page.html'
})
export class OrganisationListPage {
  organisations = new List<Organisation>();

  constructor(private httpClient: OrganisationHttpClient) {
    httpClient.list().then(items => this.organisations = items);
  }
}
