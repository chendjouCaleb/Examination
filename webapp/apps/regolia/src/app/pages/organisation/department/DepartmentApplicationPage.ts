import {Component} from "@angular/core";
import {Department} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<ApplicationList [department]="department"></ApplicationList>`
})
export class DepartmentApplicationPage {
  department: Department;

  constructor(items: CurrentItems, public _router: Router) {
    this.department = items.get('department');
  }
}
