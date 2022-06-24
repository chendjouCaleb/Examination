import {Component, ViewChild} from "@angular/core";
import {Semester, Year} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationService} from "../../../components/examination";
import {SemesterExaminationList} from "../../../components/examination/list";
import {SemesterLoader} from "examination/loaders";

@Component({
  template: `
    <div class="p-2">
      <h4 class="mt-3">Semestres de l'année scolaire</h4>
      <div SemesterList [semesters]="semesters" class="mt-3 ms-default-grid"></div>
    </div>
  `
})
export class YearSemesterPage {
  year: Year;
  semesters: Semester[];

  constructor(items: CurrentItems,
              public _router: Router,
              public service: ExaminationService,
              public _semesterLoader: SemesterLoader) {
    this.year = items.get('year');

    this._semesterLoader.loadByYear(this.year).then(items => this.semesters = items);
  }
}
