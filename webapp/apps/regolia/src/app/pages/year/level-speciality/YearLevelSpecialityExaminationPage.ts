import {Component} from "@angular/core";
import {YearLevelSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <div class="p-2">
      <h3>Examens de l'année scolaire</h3>
      <div class="mt-2">
        <div examination-level-speciality-list class="ms-default-grid" listStyle="date" [params]="params"></div>
      </div>
    </div>`
})
export class YearLevelSpecialityExaminationPage {
  yearLevelSpeciality: YearLevelSpeciality;
  get params():any { return {yearLevelSpecialityId: this.yearLevelSpeciality.id}}

  constructor(items: CurrentItems, public _router: Router ) {
    this.yearLevelSpeciality = items.get('yearLevelSpeciality');
  }
}
