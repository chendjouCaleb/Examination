import {Component, Input} from '@angular/core';
import {ExaminationLevelSpeciality} from 'examination/entities';

@Component({
  templateUrl: 'examination-level-speciality-home.page.html',
  selector: 'app-examination-level-speciality-home'
})
export class ExaminationLevelSpecialityHomePage {

  @Input()
  examinationLevelSpeciality: ExaminationLevelSpeciality;

}
