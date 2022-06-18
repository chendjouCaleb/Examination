import {Component, Input} from "@angular/core";
import {ExaminationLevel} from "examination/entities";

@Component({
  templateUrl: 'examination-level-card.html',
  selector: 'examination-level-card, ExaminationLevelCard, [examination-level-card], [ExaminationLevelCard]',
})
export class ExaminationLevelCard {
  @Input()
  examinationLevel: ExaminationLevel;
}
