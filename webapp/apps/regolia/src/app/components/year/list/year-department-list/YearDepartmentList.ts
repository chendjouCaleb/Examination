import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearDepartment} from "examination/entities";

@Component({
  templateUrl: 'YearDepartmentList.html',
  selector: 'YearDepartmentList',
  encapsulation: ViewEncapsulation.None
})
export class YearDepartmentList implements OnInit {
  @Input()
  items: YearDepartment[];

  constructor() {}

  ngOnInit(): void {

  }
}
