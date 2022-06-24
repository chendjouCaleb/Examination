import {Component} from "@angular/core";
import {Speciality, Examination, ExaminationSpeciality, YearSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationSpecialityLoader, ExaminationLoader} from "../../../../models/loader/examination";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div examination-speciality-list
             class="ms-default-grid" listStyle="date"
             *ngIf="examinationSpecialities" [examinationSpecialities]="examinationSpecialities"></div>
      </div>
    </div>`
})
export class YearSpecialityExaminationPage {
  yearSpeciality: YearSpeciality;
  examinationSpecialities: ExaminationSpeciality[];

  constructor(items: CurrentItems,
              private _loader: ExaminationSpecialityLoader,
              public _router: Router ) {
    this.yearSpeciality = items.get('yearSpeciality');

    this._loader.loadByYearSpeciality(this.yearSpeciality).then(items => {
      this.examinationSpecialities = items;
    })
  }
}
