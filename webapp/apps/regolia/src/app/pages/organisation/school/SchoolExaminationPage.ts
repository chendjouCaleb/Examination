import {Component} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<ExaminationList [school]="school"></ExaminationList>`
})
export class SchoolExaminationPage {
  school: School;

  constructor(items: CurrentItems, public _router: Router) {
    this.school = items.get('school');
  }
}
