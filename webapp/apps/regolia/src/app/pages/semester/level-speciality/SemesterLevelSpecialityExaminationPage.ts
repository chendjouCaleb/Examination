import {Component} from "@angular/core";
import {SemesterLevelSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <div class="p-2">
      <h3>Examens</h3>
      <div class="mt-2">
        <div examination-level-speciality-list class="ms-default-grid" listStyle="date" [params]="params"></div>
      </div>
    </div>`
})
export class SemesterLevelSpecialityExaminationPage {
  semesterLevelSpeciality: SemesterLevelSpeciality;
  get params():any { return {semesterLevelSpecialityId: this.semesterLevelSpeciality.id}}

  constructor(items: CurrentItems, public _router: Router ) {
    this.semesterLevelSpeciality = items.get('semesterLevelSpeciality');
  }
}
