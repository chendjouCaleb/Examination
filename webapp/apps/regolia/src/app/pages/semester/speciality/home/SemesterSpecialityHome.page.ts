import {Component, OnInit} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {ExaminationSpeciality, ExaminationSpecialityLoader, SemesterSpeciality} from "examination/models";

@Component({
  templateUrl: 'SemesterSpecialityHome.page.html',
})
export class SemesterSpecialityHomePage implements OnInit {
  semesterSpeciality : SemesterSpeciality;

  examinationSpecialities: ExaminationSpeciality[];

  constructor(items: CurrentItems, public _router: Router,
              private _loader: ExaminationSpecialityLoader,) {
    this.semesterSpeciality = items.get('semesterSpeciality');
  }

  ngOnInit() {
    this._loader.loadBySemesterSpeciality(this.semesterSpeciality).then(items => {
      this.examinationSpecialities = items;
    });
  }
}
