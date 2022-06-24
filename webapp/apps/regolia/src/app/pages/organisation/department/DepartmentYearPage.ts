import {Component, OnInit} from "@angular/core";
import {Department, YearDepartment} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {YearDepartmentLoader} from "examination/loaders";

@Component({
  template: `
      <h3>Années scolaires</h3>
      <div class="mt-2">
          <div class="br-2 p-2 d-flex"
               *ngIf="!department.yearDepartments || department.yearDepartments.length === 0">
              <i class="ms-Icon ms-Icon--Info ms-fontSize-18"></i>
              <div class="ml-2">
                  Aucune année scolaire pour ce départment !
              </div>
          </div>
          <div YearDepartmentList class="ms-default-grid" [yearDepartments]="department.yearDepartments"
            listStyle="date"
          ></div>
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
