import {Component, Input, OnInit} from '@angular/core';
import {ExaminationDepartment} from 'examination/entities';
import {ExaminationLevelLoader, ExaminationSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'examination-department-home.page.html',
  selector: 'app-examination-department-home'
})
export class ExaminationDepartmentHomePage implements OnInit {
  @Input()
  examinationDepartment: ExaminationDepartment;

  constructor(private _examinationLevelLoader: ExaminationLevelLoader,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader) {
  }

  ngOnInit(): void {
    this._examinationSpecialityLoader.loadByExaminationDepartment(this.examinationDepartment);
    this._examinationLevelLoader.loadByExaminationDepartment(this.examinationDepartment);
  }
}
