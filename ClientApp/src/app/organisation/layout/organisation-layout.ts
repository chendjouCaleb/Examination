import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "src/models/public_api";

@Component({
  selector: 'app-organisation-layout',
  templateUrl: './organisation-layout.html',
  styles: []
})
export class OrganisationLayout implements OnInit {

  @Input()
  organisation: Organisation = new Organisation();
  constructor() { }

  ngOnInit(): void {
  }

}
