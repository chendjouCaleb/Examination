import {Component, Input} from "@angular/core";
import {Level} from "examination/entities";

@Component({
  templateUrl: 'level-card.html',
  selector: 'level-card LevelCard',
  host: {
    class: 'ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class LevelCard {
  @Input()
  level: Level;
}
