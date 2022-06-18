import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ExaminationDepartment} from "examination/entities";

@Component({
  templateUrl: 'examination-department-list.html',
  selector: 'ExaminationDepartmentList, [ExaminationDepartmentList], [examination-department-list]',
  encapsulation: ViewEncapsulation.None
})
export class ExaminationDepartmentList implements OnInit {
  @Input()
  examinationDepartments: ExaminationDepartment[];

  constructor() {}

  ngOnInit(): void {

  }
}
