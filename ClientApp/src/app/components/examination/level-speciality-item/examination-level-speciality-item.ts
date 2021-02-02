import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ExaminationLevelSpeciality} from 'examination/entities';

@Component({
  templateUrl: 'examination-level-speciality-item.html',
  selector: 'app-examination-level-speciality-item',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'examination-level-speciality-item'
  }
})
export class ExaminationLevelSpecialityItem {
  @Input()
  item: ExaminationLevelSpeciality;
}
