import {Component} from "@angular/core";
import {Department, Semester} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {SemesterDepartmentLoader, SemesterLoader} from "../../../../models/loader/semester";

@Component({
  template: `
      <div class="p-2">
          <h3>Semestres</h3>
          <div class="mt-3">
              <SemesterDepartmentList *ngIf="semesters" [items]="department.semesterDepartments"></SemesterDepartmentList>
          </div>
      </div>`
})
export class DepartmentSemesterPage {
  department: Department;
  semesters: Semester[];

  constructor(items: CurrentItems,
              private _loader: SemesterDepartmentLoader,
              public _router: Router ) {
    this.department = items.get('department');

    this._loader.loadByDepartment(this.department).then(() => {
      this.semesters = this.department.semesterDepartments.map(sd => sd.semester);
    })
  }
}
