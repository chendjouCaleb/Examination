import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearDepartment, YearLevel} from "examination/models";

@Component({
  templateUrl: 'SemesterLevelHome.page.html',
})
export class SemesterLevelHomePage {
  yearLevel: YearLevel;

  constructor(items: CurrentItems, public _router: Router) {
    this.yearLevel = items.get('yearLevel');
  }
}
