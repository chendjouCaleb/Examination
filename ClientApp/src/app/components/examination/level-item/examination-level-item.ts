import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ExaminationLevel} from 'examination/entities';


@Component({
  templateUrl: 'examination-level-item.html',
  selector: 'app-examination-level-item',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'examination-level-item'
  }
})
export class ExaminationLevelItem {
  @Input()
  item: ExaminationLevel;

}
