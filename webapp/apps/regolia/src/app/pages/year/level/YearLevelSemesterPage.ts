import {Component} from "@angular/core";
import {YearLevel} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div semester-level-list class="ms-default-grid" listStyle="date" [params]="params"></div>
      </div>
    </div>`
})
export class YearLevelSemesterPage {
  yearLevel: YearLevel;
  get params(): any { return {yearLevelId: this.yearLevel.id}; }

  constructor(items: CurrentItems, public _router: Router ) {
    this.yearLevel = items.get('yearLevel');

  }
}
