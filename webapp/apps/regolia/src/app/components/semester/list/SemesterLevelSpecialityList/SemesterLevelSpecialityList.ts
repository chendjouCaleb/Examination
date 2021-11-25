import {Component, Input, ViewEncapsulation} from "@angular/core";
import {SemesterLevelSpeciality} from "examination/entities";

@Component({
  templateUrl: 'SemesterLevelSpecialityList.html',
  selector: 'SemesterLevelSpecialityList',
  encapsulation: ViewEncapsulation.None
})
export class SemesterLevelSpecialityList {
  @Input()
  items: SemesterLevelSpeciality[];
}
