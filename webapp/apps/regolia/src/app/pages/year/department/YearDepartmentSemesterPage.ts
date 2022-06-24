import {Component} from "@angular/core";
import {Department, Semester, SemesterDepartment, YearDepartment} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterDepartmentLoader, SemesterLoader} from "../../../../models/loader/semester";

@Component({
  template: `
    <div class="p-2">
      <h3>Semestres</h3>
      <div class="mt-2">
        <div semester-department-list
             class="ms-default-grid" listStyle="date"
             *ngIf="semesterDepartments" [semesterDepartments]="yearDepartment.semesterDepartments"></div>
      </div>
    </div>`
})
export class YearDepartmentSemesterPage {
  yearDepartment: YearDepartment;
  semesterDepartments: SemesterDepartment[];

  constructor(items: CurrentItems,
              private _loader: SemesterDepartmentLoader,
              public _router: Router ) {
    this.yearDepartment = items.get('yearDepartment');

    this._loader.loadByYearDepartment(this.yearDepartment).then(items => {
      this.semesterDepartments = items;
    })
  }
}
