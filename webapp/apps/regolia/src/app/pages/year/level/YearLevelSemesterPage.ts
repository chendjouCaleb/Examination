import {Component} from "@angular/core";
import {Level, Semester, SemesterLevel, YearLevel} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterLevelLoader, SemesterLoader} from "../../../../models/loader/semester";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div semester-level-list
             class="ms-default-grid" listStyle="date"
             *ngIf="semesterLevels" [semesterLevels]="yearLevel.semesterLevels"></div>
      </div>
    </div>`
})
export class YearLevelSemesterPage {
  yearLevel: YearLevel;
  semesterLevels: SemesterLevel[];

  constructor(items: CurrentItems,
              private _loader: SemesterLevelLoader,
              public _router: Router ) {
    this.yearLevel = items.get('yearLevel');

    this._loader.loadByYearLevel(this.yearLevel).then(items => {
      this.semesterLevels = items;
    })
  }
}
