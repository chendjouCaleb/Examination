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
        <div examination-speciality-list
             class="ms-default-grid" listStyle="date"
             *ngIf="examinationSpecialities" [examinationSpecialities]="examinationSpecialities"></div>
      </div>
    </div>`
})
export class SemesterSpecialityExaminationPage {
  semesterSpeciality: SemesterSpeciality;
  examinationSpecialities: ExaminationSpeciality[];

  constructor(items: CurrentItems,
              private _loader: ExaminationSpecialityLoader,
              public _router: Router ) {
    this.semesterSpeciality = items.get('semesterSpeciality');

    this._loader.loadBySemesterSpeciality(this.semesterSpeciality).then(items => {
      this.examinationSpecialities = items;
    });
  }
}
