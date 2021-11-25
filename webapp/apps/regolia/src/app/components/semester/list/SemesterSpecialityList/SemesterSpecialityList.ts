import {Component, Input, ViewEncapsulation} from "@angular/core";
import {SemesterSpeciality} from "examination/entities";

@Component({
  templateUrl: 'SemesterSpecialityList.html',
  selector: 'SemesterSpecialityList',
  encapsulation: ViewEncapsulation.None
})
export class SemesterSpecialityList {
  @Input()
  items: SemesterSpeciality[];

}
