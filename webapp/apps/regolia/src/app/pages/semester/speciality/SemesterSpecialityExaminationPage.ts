import {Component} from "@angular/core";
import {Speciality, Examination, ExaminationSpeciality, SemesterSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationSpecialityLoader, ExaminationLoader} from "../../../../models/loader/examination";

@Component({
  template: `
    <div class="p-2">
      <h3>Examens</h3>
      <div class="mt-2">
        <div examination-speciality-list class="ms-default-grid" listStyle="date" [params]="params"></div>
      </div>
    </div>`
})
export class SemesterSpecialityExaminationPage {
  semesterSpeciality: SemesterSpeciality;

  get params(): any { return {semesterSpecialityId: this.semesterSpeciality.id}; }

  constructor(items: CurrentItems,
              private _loader: ExaminationSpecialityLoader,
              public _router: Router ) {
    this.semesterSpeciality = items.get('semesterSpeciality');
  }
}
