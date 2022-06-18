import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Examination} from "examination/entities";

@Component({
  templateUrl: 'examination-item.html',
  selector: 'ExaminationListItem, [ExaminationListItem], [examination-item]',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'year-item examination-item'
  }
})
export class ExaminationItem {
  @Input()
  examination: Examination;
}
