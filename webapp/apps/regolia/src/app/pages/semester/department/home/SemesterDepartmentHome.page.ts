import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {
  SemesterDepartment,
  SemesterLevel,
  SemesterLevelHttpClient,
  SemesterLevelLoader,
  SemesterSpeciality, SemesterSpecialityLoader
} from "examination/models";

@Component({
  templateUrl: 'SemesterDepartmentHome.page.html',
})
export class SemesterDepartmentHomePage implements OnInit {
  semesterDepartment: SemesterDepartment;

  semesterLevels: SemesterLevel[];

  semesterSpecialities: SemesterSpeciality[];

  constructor(items: CurrentItems, public _router: Router,
              private _semesterLevelHttpClient: SemesterLevelHttpClient,
              private _semesterLevelLoader: SemesterLevelLoader,
              private _semesterSpecialityLoader: SemesterSpecialityLoader
              ) {
    this.semesterDepartment = items.get('semesterDepartment');
  }

  async ngOnInit() {
    const semesterLevels = await this._semesterLevelHttpClient.listBySemesterDepartment(this.semesterDepartment);
    await this._semesterLevelLoader.loadAll(semesterLevels.toArray());
    this.semesterLevels = semesterLevels.toArray();

    await this._semesterSpecialityLoader.loadBySemesterDepartment(this.semesterDepartment);
    this.semesterSpecialities = this.semesterDepartment.semesterSpecialities;
  }
}
