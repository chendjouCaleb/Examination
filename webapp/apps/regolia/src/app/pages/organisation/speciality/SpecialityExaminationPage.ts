import {Component} from "@angular/core";
import {ExaminationSpeciality, Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationSpecialityLoader} from "examination/loaders";

@Component({
  template: `
    <div class="mt-4 p-2">
      <h3>Examens</h3>
      <div class="mt-2 ms-default-grid"
           examination-speciality-list [examinationSpecialities]="examinationSpecialities" listStyle="date"></div>
    </div>
  `
})
export class SpecialityExaminationPage {
  speciality: Speciality;
  examinationSpecialities: ExaminationSpeciality[];

  constructor(items: CurrentItems,
              public _router: Router,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader) {
    this.speciality = items.get('speciality');
    this._examinationSpecialityLoader.loadBySpeciality(this.speciality)
      .then(items => this.examinationSpecialities = items)
  }
}
