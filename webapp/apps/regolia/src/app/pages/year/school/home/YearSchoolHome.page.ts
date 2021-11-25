import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterLoader, Year} from "examination/models";
import {SemesterAddService, YearAddService} from "@examination/components";

@Component({
  templateUrl: 'YearSchoolHome.page.html',
})
export class YearSchoolHomePage {
  year: Year;

  constructor(items: CurrentItems,
              private _service: SemesterAddService,
              private _yearService: YearAddService,
              private _semesterLoader: SemesterLoader,
              public _router: Router) {
    this.year = items.get('year');

    _semesterLoader.loadByYear(this.year);
  }

  addSemester() {
    this._service.add(this.year);
  }

  changeDate() {
    this._yearService.changeDate(this.year);
  }
}
