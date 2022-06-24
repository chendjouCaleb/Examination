import {Component, ViewChild} from "@angular/core";
import {Examination, Year} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationLoader} from "examination/loaders";

@Component({
  template: `
      <div class="p-2">
        <h4 class="mt-1">Examens de l'année scolaire</h4>
        <div ExaminationList class="mt-3" [params]="{yearId: year.id}"></div>
      </div>`
})
export class YearExaminationsPage {
  year: Year;
  examinations: Examination[];

  constructor(items: CurrentItems,
              public _router: Router,
              public _loader: ExaminationLoader) {
    this.year = items.get('year');

    this._loader.loadByYear(this.year).then(items => this.examinations = items);
  }
}
