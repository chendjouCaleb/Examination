import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ExaminationSpeciality} from 'examination/entities';

@Component({
  templateUrl: 'examination-speciality-item.html',
  selector: 'app-examination-speciality-item',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'examination-speciality-item'
  }
})
export class ExaminationSpecialityItem {
  @Input()
  item: ExaminationSpeciality;

  @Output()
  linkClick = new EventEmitter<ExaminationSpeciality>();
}
