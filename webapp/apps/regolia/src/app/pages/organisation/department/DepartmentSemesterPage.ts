import {Component} from "@angular/core";
import {Department} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `
      <div class="d-flex align-items-center justify-content-between">
          <div class="ms-fontWeight-semibold ms-fontSize-24">Semestres</div>
          <div>
              
          </div>
      </div>`
})
export class DepartmentSemesterPage {
  department: Department;

  constructor(items: CurrentItems,
              public _router: Router ) {
    this.department = items.get('department');
  }
}
