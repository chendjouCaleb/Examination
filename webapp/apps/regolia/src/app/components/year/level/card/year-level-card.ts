import {Component, Input} from "@angular/core";
import {YearLevel} from "examination/entities";

@Component({
  templateUrl: 'year-level-card.html',
  selector: 'year-level-card, YearLevelCard, [year-level-card], [YearLevelCard]',
})
export class YearLevelCard {
  @Input()
  yearLevel: YearLevel;
}
