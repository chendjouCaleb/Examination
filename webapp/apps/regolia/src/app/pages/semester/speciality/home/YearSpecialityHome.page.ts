import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearSpeciality} from "examination/models";

@Component({
  templateUrl: 'YearSpecialityHome.page.html',
})
export class YearSpecialityHomePage {
  yearSpeciality : YearSpeciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.yearSpeciality = items.get('yearSpeciality');
  }
}
