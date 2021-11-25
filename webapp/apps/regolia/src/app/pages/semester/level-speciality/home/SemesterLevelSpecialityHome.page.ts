import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearLevelSpeciality} from "examination/models";

@Component({
  templateUrl: 'SemesterLevelSpecialityHome.page.html',
})
export class SemesterLevelSpecialityHomePage {
  yearLevelSpeciality: YearLevelSpeciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.yearLevelSpeciality = items.get('yearLevelSpeciality');
  }
}
