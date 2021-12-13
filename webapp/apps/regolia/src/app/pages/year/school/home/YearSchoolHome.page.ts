import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterLoader, Year, YearDepartmentLoader} from "examination/models";
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
              private _yearDepartmentLoader: YearDepartmentLoader,
              public _router: Router) {
    this.year = items.get('year');

    _semesterLoader.loadByYear(this.year);
    _yearDepartmentLoader.loadByYear(this.year);
  }

  addSemester() {
    this._service.add(this.year);
  }

  changeDate() {
    this._yearService.changeDate(this.year);
  }
}
