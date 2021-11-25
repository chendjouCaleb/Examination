import {Component, Input} from "@angular/core";
import {Semester} from "examination/entities";

@Component({
  templateUrl: 'SemesterList.html',
  selector: 'SemesterList'
})
export class SemesterList {
  @Input()
  semesters: Semester[];

}
