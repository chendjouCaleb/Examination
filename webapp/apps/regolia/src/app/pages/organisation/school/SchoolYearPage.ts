import {Component} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearAddService} from "../../../components/year";

@Component({
  template: `
      <div class="d-flex align-items-center justify-content-between">
          <div class="ms-fontWeight-semibold ms-fontSize-24">Années scolaires</div>
          <div>
              <button msButton icon="Add" theme="primary" (click)="_addService.add(school)">Nouvelle année</button>
          </div>
      </div>
      <YearList [school]="school"></YearList>`
})
export class SchoolYearPage {
  school: School;

  constructor(items: CurrentItems,
              public _router: Router,
              public _addService: YearAddService) {
    this.school = items.get('school');
  }


}
