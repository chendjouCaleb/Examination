import {Component, Input} from '@angular/core';
import {Organisation} from 'src/models';

@Component({
  selector: 'app-organisation-layout',
  templateUrl: './organisation-layout.html',
  styles: []
})
export class OrganisationLayout {

  @Input()
  organisation: Organisation = new Organisation();
}
