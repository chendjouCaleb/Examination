import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearDepartment} from "examination/entities";

@Component({
  templateUrl: 'YearDepartmentList.html',
  selector: 'YearDepartmentList, [YearDepartmentList]',
  encapsulation: ViewEncapsulation.None
})
export class YearDepartmentList implements OnInit {
  @Input()
  yearDepartments: YearDepartment[];

  constructor() {}

  ngOnInit(): void {

  }
}
