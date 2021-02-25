import {Component, Input} from '@angular/core';
import {LevelSpeciality} from 'examination/entities';

@Component({
  templateUrl: 'level-speciality-home.html',
  selector: 'app-level-speciality-home'
})
export class LevelSpecialityHome {
  @Input()
  levelSpeciality: LevelSpeciality;
}
