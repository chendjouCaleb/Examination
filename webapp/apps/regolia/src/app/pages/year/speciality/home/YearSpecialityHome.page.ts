import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearLevelSpecialityLoader, YearSpeciality} from "examination/models";

@Component({
  templateUrl: 'YearSpecialityHome.page.html',
})
export class YearSpecialityHomePage {
  yearSpeciality : YearSpeciality;



  constructor(items: CurrentItems, public _router: Router,
              private yearLevelSpecialityLoader: YearLevelSpecialityLoader) {
    this.yearSpeciality = items.get('yearSpeciality');

    this.yearLevelSpecialityLoader.loadByYearSpeciality(this.yearSpeciality);
  }
}
