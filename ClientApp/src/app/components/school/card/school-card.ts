import {Component, Input, ViewEncapsulation} from '@angular/core';
import {School} from 'examination/entities';

@Component({
  templateUrl: 'school-card.html',
  selector: 'SchoolCard',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'school-card ms-depth-8'
  }
})
export class SchoolCard {
  @Input()
  school: School;
}
