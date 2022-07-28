import {Component} from "@angular/core";
import {Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
      <div class="p-3">
          <h2>Semestres</h2>
          <div  class="mb-2">
            <div class="mt-2 ms-default-grid" SemesterSpecialityList [params]="params" listStyle="date"></div>
          </div>
      </div>`
})
export class SpecialitySemesterPage {
  speciality: Speciality;
  get params(): any { return {specialityId: this.speciality.id}; }

  constructor(items: CurrentItems, public _router: Router ) {
    this.speciality = items.get('speciality');
  }
}
