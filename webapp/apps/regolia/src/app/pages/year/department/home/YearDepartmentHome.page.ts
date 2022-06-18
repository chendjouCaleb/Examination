import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "examination/app/current-items";
import {Router} from "@angular/router";
import {
  SemesterDepartment,
  SemesterDepartmentHttpClient,
  SemesterDepartmentLoader,
  YearDepartment,
  YearLevel,
  YearLevelLoader,
  YearLevelSpeciality,
  YearLevelSpecialityLoader,
  YearSpeciality,
  YearSpecialityLoader
} from "examination/models";

@Component({
  templateUrl: 'YearDepartmentHome.page.html',
})
export class YearDepartmentHomePage implements OnInit {
  yearDepartment: YearDepartment;
  semesterDepartments: SemesterDepartment[];
  yearLevels: YearLevel[];
  yearSpecialities: YearSpeciality[];
  yearLevelSpecialities: YearLevelSpeciality[];

  constructor(items: CurrentItems, public _router: Router,
              private semesterLoader: SemesterDepartmentLoader,
              private _yearLevelLoader: YearLevelLoader,
              private _yearSpecialityLoader: YearSpecialityLoader,
              private _yearLevelSpecialityLoader: YearLevelSpecialityLoader,
              private semesterHttpClient: SemesterDepartmentHttpClient) {
    this.yearDepartment = items.get('yearDepartment');
  }

  async ngOnInit() {
    const semesterDepartments = await this.semesterHttpClient.listByYearDepartment(this.yearDepartment);
    await this.semesterLoader.loadAll(semesterDepartments);

    this.semesterDepartments = semesterDepartments.toArray();

    this.yearLevels = await this._yearLevelLoader.loadByYearDepartment(this.yearDepartment);
    this.yearSpecialities = await this._yearSpecialityLoader.loadByYearDepartment(this.yearDepartment);
    this.yearLevelSpecialities = await this._yearLevelSpecialityLoader.loadByYearDepartment(this.yearDepartment);

    for (const yearLevel of this.yearLevels) {
      yearLevel.yearLevelSpecialities = this.yearLevelSpecialities.filter(yls => yls.yearLevelId == yearLevel.id);
    }

    for (const yearSpeciality of this.yearSpecialities) {
      yearSpeciality.yearLevelSpecialities = this.yearLevelSpecialities
                                              .filter(yls => yls.yearSpecialityId == yearSpeciality.id)
    }

  }
}
