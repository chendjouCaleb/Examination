import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterLevelSpeciality} from "examination/models";

@Component({
  templateUrl: 'SemesterLevelSpecialityHome.page.html',
})
export class SemesterLevelSpecialityHomePage {
  semesterLevelSpeciality: SemesterLevelSpeciality;

  get params():any { return {semesterLevelSpecialityId: this.semesterLevelSpeciality.id}}

  constructor(items: CurrentItems, public _router: Router) {
    this.semesterLevelSpeciality = items.get('semesterLevelSpeciality');
  }
}
