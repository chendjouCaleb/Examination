import {Component} from "@angular/core";
import {Department} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<PrincipalList [department]="department"></PrincipalList>`
})
export class DepartmentPrincipalPage {
  department: Department;

  constructor(items: CurrentItems, public _router: Router) {
    this.department = items.get('department');
  }
}
