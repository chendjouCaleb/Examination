import {Component} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearAddService} from "examination/app/components";
import {SemesterLoader} from "../../../../models/loader/semester";


@Component({
  template: `
      <div class="p-3">
          <div class="d-flex align-items-center justify-content-between">
              <h3>Semestres</h3>
          </div>
          <div class="mt-3">
              <SemesterList *ngIf="school.semesters" [semesters]="school.semesters"></SemesterList>
          </div>
      </div>
  `
})
export class SchoolSemesterPage {
  school: School;

  constructor(items: CurrentItems,
              private _semesterLoader: SemesterLoader,
              public _router: Router) {
    this.school = items.get('school');
    this._semesterLoader.loadBySchool(this.school);
  }
}
