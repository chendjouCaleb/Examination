import {Component} from "@angular/core";
import {Department, Examination, ExaminationDepartment, YearDepartment} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationDepartmentLoader, ExaminationLoader} from "../../../../models/loader/examination";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div examination-department-list
             class="ms-default-grid" listStyle="date"
             *ngIf="examinationDepartments" [examinationDepartments]="examinationDepartments"></div>
      </div>
    </div>`
})
export class YearDepartmentExaminationPage {
  yearDepartment: YearDepartment;
  examinationDepartments: ExaminationDepartment[];

  constructor(items: CurrentItems,
              private _loader: ExaminationDepartmentLoader,
              public _router: Router ) {
    this.yearDepartment = items.get('yearDepartment');

    this._loader.loadByYearDepartment(this.yearDepartment).then(items => {
      this.examinationDepartments = items;
    })
  }
}
