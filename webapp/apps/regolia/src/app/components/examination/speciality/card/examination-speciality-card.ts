import {Component, Input} from "@angular/core";
import {Speciality, ExaminationSpeciality} from "examination/entities";

@Component({
  templateUrl: 'examination-speciality-card.html',
  selector: 'examinationSpeciality-card, ExaminationSpecialityCard, [examination-speciality-card], [ExaminationSpecialityCard]',
  host: {
    class: 'ms-link-inherit ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class ExaminationSpecialityCard {
  @Input()
  examinationSpeciality: ExaminationSpeciality;

  get speciality(): Speciality {
    return this.examinationSpeciality?.semesterSpeciality?.yearSpeciality?.speciality;
  }
}
