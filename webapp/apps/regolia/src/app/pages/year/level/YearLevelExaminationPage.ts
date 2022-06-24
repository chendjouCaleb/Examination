import {Component} from "@angular/core";
import {Level, Examination, ExaminationLevel, YearLevel} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationLevelLoader, ExaminationLoader} from "../../../../models/loader/examination";

@Component({
  template: `
    <div class="p-2">
      <h3>Examens</h3>
      <div class="mt-2">
        <div examination-level-list
             class="ms-default-grid" listStyle="date"
             *ngIf="examinationLevels" [examinationLevels]="examinationLevels"></div>
      </div>
    </div>`
})
export class YearLevelExaminationPage {
  yearLevel: YearLevel;
  examinationLevels: ExaminationLevel[];

  constructor(items: CurrentItems,
              private _loader: ExaminationLevelLoader,
              public _router: Router ) {
    this.yearLevel = items.get('yearLevel');

    this._loader.loadByYearLevel(this.yearLevel).then(items => {
      this.examinationLevels = items;
    })
  }
}
