import {Component, Input, OnInit} from '@angular/core';
import {ExaminationSpeciality} from 'examination/entities';
import {ExaminationLevelSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'examination-speciality-home.page.html',
  selector: 'app-examination-speciality-home'
})
export class ExaminationSpecialityHomePage implements OnInit {

  @Input()
  examinationSpeciality: ExaminationSpeciality;

  constructor(private _examinationLevelSpecialityLoader: ExaminationLevelSpecialityLoader) {
  }

  ngOnInit(): void {
    this._examinationLevelSpecialityLoader.loadByExaminationSpeciality(this.examinationSpeciality);
  }
}
