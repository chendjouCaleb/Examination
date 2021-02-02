import {Component, Input} from "@angular/core";
import {Speciality} from "examination/entities";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'speciality.page-layout.html',
  selector: 'app-speciality-page-layout'
})
export class SpecialityPageLayout {
  @Input()
  speciality: Speciality;

  constructor(public _router: Router) {}
}
