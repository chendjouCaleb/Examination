import {Component, OnInit} from "@angular/core";
import {Department, ExaminationDepartment} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationDepartmentLoader} from "examination/loaders";

@Component({
  template: `
    <div class="p-2">
      <h3>Examens ({{examinationDepartments?.length}})</h3>

      <div class="mt-2 ms-default-grid"
           ExaminationDepartmentList [examinationDepartments]="examinationDepartments" listStyle="date">
      </div>
    </div>
  `
})
export class DepartmentExaminationPage implements OnInit {
  department: Department;
  examinationDepartments: ExaminationDepartment[];

  constructor(items: CurrentItems,
              private _examinationDepartmentLoader: ExaminationDepartmentLoader,
              public _router: Router) {
    this.department = items.get('department');
  }

  async ngOnInit() {
    this.examinationDepartments = await this._examinationDepartmentLoader.loadByDepartment(this.department);
  }
}
