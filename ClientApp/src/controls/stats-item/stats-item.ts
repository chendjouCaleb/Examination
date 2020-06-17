import {Component, Input, ViewEncapsulation} from "@angular/core";
import {sharedColor, sharedColors} from "../colors";

@Component({
  templateUrl: 'stats-item.html',
  styleUrls: ['stats-item.scss'],
  selector: '[statsItem], stats-item',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': "'ms-statsItem ms-borderColor-shared' + color"
  }
})
export class StatsItem {

  @Input()
  color: sharedColor = sharedColors[Math.floor(Math.random() * sharedColors.length)];

  @Input()
  value: any;

  @Input()
  name: string;
}
