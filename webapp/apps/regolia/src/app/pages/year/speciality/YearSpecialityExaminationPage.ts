import {Component} from "@angular/core";
import {YearSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div examination-speciality-list class="ms-default-grid" listStyle="date" [params]="params"></div>
      </div>
    </div>`
})
export class YearSpecialityExaminationPage {
  yearSpeciality: YearSpeciality;

  get params(): any {
    return {yearSpecialityId: this.yearSpeciality.id};
  }

  constructor(items: CurrentItems, public _router: Router) {
    this.yearSpeciality = items.get('yearSpeciality');
  }
}
