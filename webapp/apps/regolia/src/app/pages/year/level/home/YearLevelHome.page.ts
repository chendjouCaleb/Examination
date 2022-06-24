import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {
  ExaminationDepartment, ExaminationLevel,
  ExaminationLevelLoader,
  SemesterDepartment, SemesterLevel,
  SemesterLevelLoader,
  YearLevel
} from "examination/models";

@Component({
  templateUrl: 'YearLevelHome.page.html',
})
export class YearLevelHomePage implements OnInit {
  yearLevel: YearLevel;

  examinationLevels: ExaminationLevel[];
  semesterLevels: SemesterLevel[];

  constructor(items: CurrentItems, public _router: Router,
              private _semesterLevelLoader: SemesterLevelLoader,
              private _examinationLevelLoader: ExaminationLevelLoader) {
    this.yearLevel = items.get('yearLevel');
  }

  async ngOnInit() {
    this.examinationLevels = await this._examinationLevelLoader.loadByYearLevel(this.yearLevel);
    this.semesterLevels = await this._semesterLevelLoader.loadByYearLevel(this.yearLevel);
  }
}
