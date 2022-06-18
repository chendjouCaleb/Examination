import {Component, Input} from "@angular/core";
import {Speciality, SemesterSpeciality} from "examination/entities";

@Component({
  templateUrl: 'semester-speciality-card.html',
  selector: 'semesterSpeciality-card, SemesterSpecialityCard, [semester-speciality-card], [SemesterSpecialityCard]',
  host: {
    class: 'ms-link-inherit ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class SemesterSpecialityCard {
  @Input()
  semesterSpeciality: SemesterSpeciality;

  get speciality(): Speciality {
    return this.semesterSpeciality?.yearSpeciality?.speciality;
  }
}
