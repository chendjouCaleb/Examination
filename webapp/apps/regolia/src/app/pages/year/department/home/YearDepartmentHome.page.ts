import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {
  SemesterDepartment,
  SemesterDepartmentHttpClient,
  SemesterDepartmentLoader,
  YearDepartment, YearLevelLoader, YearSpecialityLoader
} from "examination/models";

@Component({
  templateUrl: 'YearDepartmentHome.page.html',
})
export class YearDepartmentHomePage implements OnInit {
  yearDepartment: YearDepartment;
  semesterDepartments: SemesterDepartment[];

  constructor(items: CurrentItems, public _router: Router,
              private semesterLoader: SemesterDepartmentLoader,
              private _yearLevelLoader: YearLevelLoader,
              private _yearSpecialityLoader: YearSpecialityLoader,
              private semesterHttpClient: SemesterDepartmentHttpClient) {
    this.yearDepartment = items.get('yearDepartment');
  }

  async ngOnInit()  {
    const semesterDepartments = await this.semesterHttpClient.listByYearDepartment(this.yearDepartment);
    await this.semesterLoader.loadAll(semesterDepartments);

    this.semesterDepartments = semesterDepartments.toArray();

    this._yearLevelLoader.loadByYearDepartment(this.yearDepartment);
    this._yearSpecialityLoader.loadByYearDepartment(this.yearDepartment);
  }
}
