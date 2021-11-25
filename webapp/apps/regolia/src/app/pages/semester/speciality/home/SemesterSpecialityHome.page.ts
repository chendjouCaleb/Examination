import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterSpeciality} from "examination/models";

@Component({
  templateUrl: 'SemesterSpecialityHome.page.html',
})
export class SemesterSpecialityHomePage {
  semesterSpeciality : SemesterSpeciality;

  constructor(items: CurrentItems, public _router: Router) {
    this.semesterSpeciality = items.get('semesterSpeciality');
  }
}
