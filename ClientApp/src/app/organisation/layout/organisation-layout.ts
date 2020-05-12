import {Component, Input, OnInit} from '@angular/core';
import {Organisation, OrganisationUser } from 'src/models';
import {CurrentItems} from 'examination/app/current-items';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-organisation-layout',
  templateUrl: './organisation-layout.html',
  styles: []
})
export class OrganisationLayout implements OnInit {

  breadCrumbItems: BreadcrumbItem[] = [];

  @Input()
  title: string;

  @Input()
  organisation: Organisation = new Organisation();

  @Input()
  organisationUser: OrganisationUser;

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.organisation = currentItems.get('organisation');
    this.organisationUser = currentItems.get('organisationUser');
  }


  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'Organisations', url: '/organisations'},
      {name: this.organisation.name, url: this.organisation.url}
    ];

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    }
  }
}
