import {Component, Input} from "@angular/core";
import {Semester} from "examination/entities";

@Component({
  templateUrl: 'SemesterList.html',
  selector: 'SemesterList, [SemesterList], [semester-list]'
})
export class SemesterList {
  @Input()
  semesters: Semester[];

}
