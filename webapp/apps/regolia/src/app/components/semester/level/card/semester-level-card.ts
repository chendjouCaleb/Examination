import {Component, Input} from "@angular/core";
import {SemesterLevel} from "examination/entities";

@Component({
  templateUrl: 'semester-level-card.html',
  selector: 'semester-level-card, SemesterLevelCard, [semester-level-card], [SemesterLevelCard]',
})
export class SemesterLevelCard {
  @Input()
  semesterLevel: SemesterLevel;
}
