import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {
  ExaminationLevel, ExaminationLevelLoader, ExaminationSpeciality, ExaminationSpecialityLoader,
  SemesterLevel,
  SemesterLevelLoader, SemesterSpeciality, SemesterSpecialityLoader,
  YearLevelSpecialityLoader,
  YearSpeciality
} from "examination/models";

@Component({
  templateUrl: 'YearSpecialityHome.page.html',
})
export class YearSpecialityHomePage {
  yearSpeciality : YearSpeciality;

  examinationSpecialities: ExaminationSpeciality[];
  semesterSpecialities: SemesterSpeciality[];


  constructor(items: CurrentItems, public _router: Router,
              private yearLevelSpecialityLoader: YearLevelSpecialityLoader,
              private _semesterSpecialityLoader: SemesterSpecialityLoader,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader) {
    this.yearSpeciality = items.get('yearSpeciality');

    this.yearLevelSpecialityLoader.loadByYearSpeciality(this.yearSpeciality);
  }

  async ngOnInit() {
    this.examinationSpecialities = await this._examinationSpecialityLoader.loadByYearSpeciality(this.yearSpeciality);
    this.semesterSpecialities = await this._semesterSpecialityLoader.loadByYearSpeciality(this.yearSpeciality);
  }
}
