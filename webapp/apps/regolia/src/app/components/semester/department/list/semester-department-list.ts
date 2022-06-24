import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterDepartment} from "examination/entities";

@Component({
  templateUrl: 'semester-department-list.html',
  selector: 'SemesterDepartmentList, [SemesterDepartmentList], [semester-department-list]',
  encapsulation: ViewEncapsulation.None
})
export class SemesterDepartmentList implements OnInit {
  @Input()
  semesterDepartments: SemesterDepartment[];

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  constructor() {}

  ngOnInit(): void {

  }
}
