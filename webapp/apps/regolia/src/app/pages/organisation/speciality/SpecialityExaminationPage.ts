import {Component} from "@angular/core";
import {Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `examens`
})
export class SpecialityExaminationPage {
  speciality: Speciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.speciality = items.get('speciality');
  }
}
