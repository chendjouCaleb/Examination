import {Component, Input} from "@angular/core";
import {Speciality, SemesterSpeciality, LevelSpeciality, SemesterLevelSpeciality} from "examination/entities";

@Component({
  templateUrl: 'semester-level-speciality-card.html',
  selector: '[semester-level-speciality-card], [SemesterLevelSpecialityCard]',
  host: {
    class: 'ms-link-inherit ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class SemesterLevelSpecialityCard {
  @Input()
  semesterLevelSpeciality: SemesterLevelSpeciality;

  get levelSpeciality(): LevelSpeciality {
    return this.semesterLevelSpeciality?.yearLevelSpeciality?.levelSpeciality;
  }
}
