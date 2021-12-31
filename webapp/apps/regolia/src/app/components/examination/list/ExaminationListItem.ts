import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Examination} from "examination/entities";

@Component({
  templateUrl: 'ExaminationListItem.html',
  selector: 'ExaminationListItem, a[ExaminationListItem]',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'year-item examination-item'
  }
})
export class ExaminationListItem {
  @Input('ExaminationListItem')
  examination: Examination;
}
