import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearLevelSpeciality} from "examination/models";

@Component({
  templateUrl: 'YearLevelSpecialityHome.page.html',
})
export class YearLevelSpecialityHomePage {
  yearLevelSpeciality: YearLevelSpeciality;

  get params():any { return {yearLevelSpecialityId: this.yearLevelSpeciality.id}};

  constructor(items: CurrentItems, public _router: Router) {
    this.yearLevelSpeciality = items.get('yearLevelSpeciality');
  }
}
