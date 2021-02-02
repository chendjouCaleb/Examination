import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ExaminationLevelSpeciality} from 'examination/entities';

@Component({
  templateUrl: 'examination-speciality-level-item.html',
  selector: 'app-examination-speciality-level-item',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'examination-speciality-level-item'
  }
})
export class ExaminationSpecialityLevelItem {
  @Input()
  item: ExaminationLevelSpeciality;
}
