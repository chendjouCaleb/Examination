import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Year} from "examination/entities";

@Component({
  templateUrl: 'YearItem.html',
  selector: 'YearItem, [YearItem], [year-item]',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'year-item'
  }
})
export class YearItem {
  @Input()
  year: Year;
}
