import {Component, OnInit} from "@angular/core";
import {Department, YearDepartment} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearDepartmentLoader} from "examination/loaders";

@Component({
  template: `
      <h3>Années scolaires</h3>
      <div class="mt-3">
          <YearDepartmentList [items]="department.yearDepartments"></YearDepartmentList>
      </div>`
})
export class DepartmentYearPage {
  department: Department;

  yearDepartments: YearDepartment[];

  constructor(items: CurrentItems,
              private _yearDepartmentLoader: YearDepartmentLoader,
              public _router: Router) {
    this.department = items.get('department');

    this._yearDepartmentLoader.loadByDepartment(this.department);
  }
}
