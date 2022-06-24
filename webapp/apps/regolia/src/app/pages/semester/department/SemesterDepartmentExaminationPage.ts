import {Component} from "@angular/core";
import {Department, Examination, ExaminationDepartment, SemesterDepartment} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationDepartmentLoader, ExaminationLoader} from "../../../../models/loader/examination";

@Component({
  template: `
    <div class="p-2">
      <h3>Examens</h3>
      <div class="mt-2">
        <div examination-department-list
             class="ms-default-grid" listStyle="date"
             *ngIf="examinationDepartments" [examinationDepartments]="examinationDepartments"></div>
      </div>
    </div>`
})
export class SemesterDepartmentExaminationPage {
  semesterDepartment: SemesterDepartment;
  examinationDepartments: ExaminationDepartment[];

  constructor(items: CurrentItems,
              private _loader: ExaminationDepartmentLoader,
              public _router: Router ) {
    this.semesterDepartment = items.get('semesterDepartment');

    this._loader.loadBySemesterDepartment(this.semesterDepartment).then(items => {
      console.log(items.length)
      this.examinationDepartments = items;
    })
  }
}
