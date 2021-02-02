import {Component} from '@angular/core';
import {Department} from 'examination/entities';
import {Router} from '@angular/router';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'department.page-layout.html',
  selector: 'app-department-page-layout'
})
export class DepartmentPageLayout {
  department: Department;

  constructor(public _router: Router, items: CurrentItems) {
    this.department = items.get('department');
  }
}
