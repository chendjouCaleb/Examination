import {Component, ViewChild} from "@angular/core";
import {School, Year} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationList, ExaminationService} from "../../../components/examination";

@Component({
  template: `
      <h4 class="mt-3">Examens de l'année scolaire</h4>
      <ExaminationList class="mt-3" [params]="{yearId: year.id}"></ExaminationList>`
})
export class YearExaminationsPage {
  year: Year;
  @ViewChild(ExaminationList)
  list: ExaminationList;

  constructor(items: CurrentItems, public _router: Router, public service: ExaminationService) {
    this.year = items.get('year');
  }
}
