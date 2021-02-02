import {Component, Inject, Input, OnInit} from '@angular/core';
import {Examination} from 'examination/entities';
import {ExaminationDepartmentLoader, ExaminationLevelLoader, ExaminationSpecialityLoader} from "examination/loaders";
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from "examination/app/components";

@Component({
  templateUrl: 'examination-school-home.page.html',
  selector: 'app-examination-school-home'
})
export class ExaminationSchoolHomePage implements OnInit{
  @Input()
  examination: Examination;

  constructor(private _examinationDepartmentLoader: ExaminationDepartmentLoader,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader,
              private _examinationLevelLoader: ExaminationLevelLoader,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService) {

  }

  async ngOnInit() {
    console.log(this.examination.statistics)
  }

}
