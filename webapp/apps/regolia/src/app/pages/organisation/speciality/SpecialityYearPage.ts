import {Component} from "@angular/core";
import {Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearSpecialityLoader} from "examination/loaders";

@Component({
  template: `
          <div class="p-3">
              <h3>Années scolaires</h3>
              <div class="mt-3">
                  <div YearSpecialityList class="ms-default-grid"
                       [yearSpecialities]="speciality.yearSpecialities" listStyle="date"></div>
              </div>
          </div>`
})
export class SpecialityYearPage {
  speciality: Speciality;

  constructor(items: CurrentItems,
              public _yearSpecialityLoader: YearSpecialityLoader,
              public _router: Router ) {
    this.speciality = items.get('speciality');

    this._yearSpecialityLoader.loadBySpeciality(this.speciality);
  }


}
