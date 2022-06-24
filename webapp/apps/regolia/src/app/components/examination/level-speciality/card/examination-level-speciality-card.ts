import {Component, Input} from "@angular/core";
import {Speciality, ExaminationSpeciality, ExaminationLevelSpeciality, LevelSpeciality} from "examination/entities";

@Component({
  templateUrl: 'examination-level-speciality-card.html',
  selector: '[examination-level-speciality-card], [ExaminationLevelSpecialityCard]',
  host: {
    class: 'ms-link-inherit ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class ExaminationLevelSpecialityCard {
  @Input()
  examinationLevelSpeciality: ExaminationLevelSpeciality;

  get levelSpeciality(): LevelSpeciality {
    return this.examinationLevelSpeciality?.semesterLevelSpeciality?.yearLevelSpeciality?.levelSpeciality;
  }
}
