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

  get params(): any {
    return {yearSpecialityId: this.yearSpeciality.id};
  }


  constructor(items: CurrentItems, public _router: Router,
              private yearLevelSpecialityLoader: YearLevelSpecialityLoader,
              private _semesterSpecialityLoader: SemesterSpecialityLoader,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader) {
    this.yearSpeciality = items.get('yearSpeciality');

    this.yearLevelSpecialityLoader.loadByYearSpeciality(this.yearSpeciality);
  }

  async ngOnInit() {  }
}
