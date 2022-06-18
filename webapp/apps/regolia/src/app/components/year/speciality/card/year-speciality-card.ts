import {Component, Input} from "@angular/core";
import {Speciality, YearSpeciality} from "examination/entities";

@Component({
  templateUrl: 'year-speciality-card.html',
  selector: 'yearSpeciality-card, YearSpecialityCard, [year-speciality-card], [YearSpecialityCard]',
  host: {
    class: 'ms-link-inherit ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class YearSpecialityCard {
  @Input()
  yearSpeciality: YearSpeciality;

  get speciality(): Speciality {
    return this.yearSpeciality?.speciality;
  }
}
