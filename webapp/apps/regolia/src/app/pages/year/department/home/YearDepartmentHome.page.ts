import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {YearDepartment} from "examination/models";

@Component({
  templateUrl: 'YearDepartmentHome.page.html',
})
export class YearDepartmentHomePage {
  yearDepartment: YearDepartment;

  constructor(items: CurrentItems, public _router: Router) {
    this.yearDepartment = items.get('yearDepartment');
  }
}
