import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Semester, Year} from "examination/entities";

@Component({
  templateUrl: 'SemesterItem.html',
  selector: 'SemesterItem, a[SemesterItem]',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'year-item'
  }
})
export class SemesterItem {
  @Input()
  semester: Semester;
}
