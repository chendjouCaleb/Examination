import {List} from '@positon/collections';
import {Organisation, OrganisationHttpClient} from 'src/models';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'organisation-list.html',
  selector: 'organisation-list'
})
export class OrganisationList implements OnInit {
  organisations = new List<Organisation>();

  @Input()
  onclick = (item: Organisation) => this._router.navigateByUrl(`/organisations/${item.id}/home`);


  constructor(private _httpClient: OrganisationHttpClient, private _router: Router) {
  }

  async ngOnInit() {
    this.organisations = await this._httpClient.list();
  }
}
