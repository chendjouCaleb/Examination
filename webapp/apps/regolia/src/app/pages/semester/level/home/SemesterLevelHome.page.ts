import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterLevel} from "examination/models";

@Component({
  templateUrl: 'SemesterLevelHome.page.html',
})
export class SemesterLevelHomePage {
  semesterLevel: SemesterLevel;

  constructor(items: CurrentItems, public _router: Router) {
    this.semesterLevel = items.get('semesterLevel');
  }
}
