import {Component} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
      <h4 class="mt-3">Examens de l'établissement</h4>
      <ExaminationList class="mt-3" [params]="{schoolId: school.id}"></ExaminationList>`
})
export class SchoolExaminationPage {
  school: School;

  constructor(items: CurrentItems, public _router: Router) {
    this.school = items.get('school');
  }
}
