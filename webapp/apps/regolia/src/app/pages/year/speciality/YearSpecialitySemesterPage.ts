import {Component} from "@angular/core";
import {Speciality, Semester, SemesterSpeciality, YearSpeciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterSpecialityLoader, SemesterLoader} from "../../../../models/loader/semester";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div semester-speciality-list
             class="ms-default-grid" listStyle="date"
             *ngIf="semesterSpecialities" [semesterSpecialities]="semesterSpecialities"></div>
      </div>
    </div>`
})
export class YearSpecialitySemesterPage {
  yearSpeciality: YearSpeciality;
  semesterSpecialities: SemesterSpeciality[];

  constructor(items: CurrentItems,
              private _loader: SemesterSpecialityLoader,
              public _router: Router ) {
    this.yearSpeciality = items.get('yearSpeciality');

    this._loader.loadByYearSpeciality(this.yearSpeciality).then(items => {
      this.semesterSpecialities = items;
    });
  }
}
