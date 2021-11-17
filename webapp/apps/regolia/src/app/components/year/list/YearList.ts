import {Component, Input} from "@angular/core";
import {School} from "examination/entities";

@Component({
  templateUrl: 'YearList.html',
  selector: 'YearList'
})
export class YearList {
  @Input()
  school: School;
}
