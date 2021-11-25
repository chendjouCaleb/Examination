import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {SemesterDepartment} from "examination/models";

@Component({
  templateUrl: 'SemesterDepartmentHome.page.html',
})
export class SemesterDepartmentHomePage {
  semesterDepartment: SemesterDepartment;

  constructor(items: CurrentItems, public _router: Router) {
    this.semesterDepartment = items.get('semesterDepartment');
  }
}
