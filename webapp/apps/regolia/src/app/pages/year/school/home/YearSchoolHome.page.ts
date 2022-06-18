import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {
  SemesterLoader,
  Year,
  YearDepartment,
  YearDepartmentLoader,
  YearLevel,
  YearLevelLoader, YearSpeciality, YearSpecialityLoader
} from "examination/models";
import {SemesterAddService, YearAddService} from "@examination/components";

@Component({
  templateUrl: 'YearSchoolHome.page.html',
})
export class YearSchoolHomePage implements OnInit {
  year: Year;

  yearDepartments: YearDepartment[];
  yearLevels: YearLevel[];
  yearSpecialities: YearSpeciality[];

  constructor(items: CurrentItems,
              private _service: SemesterAddService,
              private _yearService: YearAddService,
              private _semesterLoader: SemesterLoader,
              private _yearDepartmentLoader: YearDepartmentLoader,
              private _yearLevelLoader: YearLevelLoader,
              private _yearSpecialityLoader: YearSpecialityLoader,
              public _router: Router) {
    this.year = items.get('year');

    _semesterLoader.loadByYear(this.year);

  }

  async ngOnInit() {
    this.yearDepartments = await this._yearDepartmentLoader.loadByYear(this.year);
    this.yearLevels = await this._yearLevelLoader.loadByYear(this.year);
    this.yearSpecialities = await this._yearSpecialityLoader.loadByYear(this.year);

    for (let yearDepartment of this.yearDepartments) {
      yearDepartment.yearLevels = this.yearLevels.filter(yl => yl.yearDepartmentId == yearDepartment.id);
      yearDepartment.yearSpecialities = this.yearSpecialities.filter(yl => yl.yearDepartmentId == yearDepartment.id);
    }
  }

  addSemester() {
    this._service.add(this.year);
  }

  changeDate() {
    this._yearService.changeDate(this.year);
  }
}
