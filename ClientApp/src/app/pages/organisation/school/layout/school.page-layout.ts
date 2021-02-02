import {Component, Input} from "@angular/core";
import {School} from "examination/entities";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'school.page-layout.html',
  selector: 'app-school-page-layout'
})
export class SchoolPageLayout {
  @Input()
  school: School;

  constructor(public _router: Router) {}
}
