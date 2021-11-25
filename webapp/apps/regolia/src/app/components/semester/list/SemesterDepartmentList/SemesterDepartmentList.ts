import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterDepartment} from "examination/entities";

@Component({
  templateUrl: 'SemesterDepartmentList.html',
  selector: 'SemesterDepartmentList',
  encapsulation: ViewEncapsulation.None
})
export class SemesterDepartmentList implements OnInit {
  @Input()
  items: SemesterDepartment[];

  constructor() {}

  ngOnInit(): void {

  }
}
