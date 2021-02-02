import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {School} from 'examination/entities';

@Component({
  templateUrl: 'school-card.html',
  selector: 'app-school-card',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'd-block'
  }
})
export class SchoolCard {
  @Input()
  school: School;

  @Output()
  onclick = new EventEmitter<MouseEvent>();

}
