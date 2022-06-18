import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {
  SemesterDepartment,
  SemesterLevel,
  SemesterLevelHttpClient,
  SemesterLevelLoader, SemesterLevelSpeciality, SemesterLevelSpecialityLoader,
  SemesterSpeciality, SemesterSpecialityLoader
} from "examination/models";

@Component({
  templateUrl: 'SemesterDepartmentHome.page.html',
})
export class SemesterDepartmentHomePage implements OnInit {
  semesterDepartment: SemesterDepartment;

  semesterLevels: SemesterLevel[];
  semesterSpecialities: SemesterSpeciality[];
  semesterLevelSpecialities: SemesterLevelSpeciality[];

  constructor(items: CurrentItems, public _router: Router,
              private _semesterLevelHttpClient: SemesterLevelHttpClient,
              private _semesterLevelLoader: SemesterLevelLoader,
              private _semesterSpecialityLoader: SemesterSpecialityLoader,
              private _semesterLevelSpecialityLoader: SemesterLevelSpecialityLoader,
              ) {
    this.semesterDepartment = items.get('semesterDepartment');
  }

  async ngOnInit() {
    this.semesterLevels = await this._semesterLevelLoader.loadBySemesterDepartment(this.semesterDepartment);
    this.semesterSpecialities = await this._semesterSpecialityLoader.loadBySemesterDepartment(this.semesterDepartment);
    this.semesterLevelSpecialities = await this._semesterLevelSpecialityLoader.loadBySemesterDepartment(this.semesterDepartment);

    for (const semesterLevel of this.semesterLevels) {
      semesterLevel.semesterLevelSpecialities = this.semesterLevelSpecialities.filter(yls => yls.semesterLevelId == semesterLevel.id);
    }

    for (const semesterSpeciality of this.semesterSpecialities) {
      semesterSpeciality.semesterLevelSpecialities = this.semesterLevelSpecialities
        .filter(yls => yls.semesterSpecialityId == semesterSpeciality.id)
    }
  }


}
