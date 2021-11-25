import {Component} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearAddService} from "examination/app/components";


@Component({
  template: `
      <div class="p-3">
          <div class="d-flex align-items-center justify-content-between">
              <h2>Années scolaires</h2>
              <div>
                  <button msButton icon="Add" theme="primary" (click)="_addService.add(school)">Nouvelle année</button>
              </div>
          </div>
          <div class="mt-3">
              <YearList [school]="school"></YearList>
          </div>
      </div>
  `
})
export class SchoolYearPage {
  school: School;

  constructor(items: CurrentItems,
              public _router: Router,
              public _addService: YearAddService) {
    this.school = items.get('school');
  }


}
