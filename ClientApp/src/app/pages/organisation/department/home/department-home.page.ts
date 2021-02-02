import {Component, Input} from '@angular/core';
import {Department} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'department-home.page.html',
  selector: 'app-department-home-page',
  styleUrls: ['department-home.page.scss']
})
export class DepartmentHomePage {

  @Input()
  department: Department;

}
