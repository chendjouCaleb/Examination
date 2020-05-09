import {Component, Input} from '@angular/core';
import {Organisation} from 'src/models';
import {CurrentItems} from "examination/app/current-items";

@Component({
  selector: 'app-organisation-layout',
  templateUrl: './organisation-layout.html',
  styles: []
})
export class OrganisationLayout {

  constructor(currentItems: CurrentItems) {
    this.organisation = currentItems.get("organisation")
  }

  @Input()
  organisation: Organisation = new Organisation();
}
