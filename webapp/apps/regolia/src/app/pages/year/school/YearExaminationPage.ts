import {Component, ViewChild} from "@angular/core";
import {Year} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationService} from "../../../components/examination";
import {SemesterExaminationList} from "../../../components/examination/list";

@Component({
  template: `
      <h4 class="mt-3">Examens de l'année scolaire</h4>
      <SemesterExaminationList class="mt-3" [params]="{yearId: year.id}"></SemesterExaminationList>`
})
export class YearExaminationsPage {
  year: Year;
  @ViewChild(SemesterExaminationList)
  list: SemesterExaminationList;

  constructor(items: CurrentItems, public _router: Router, public service: ExaminationService) {
    this.year = items.get('year');
  }
}
