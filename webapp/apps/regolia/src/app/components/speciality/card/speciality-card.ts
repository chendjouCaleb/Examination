import {Component, Input} from "@angular/core";
import {Speciality} from "examination/entities";

@Component({
  templateUrl: 'speciality-card.html',
  selector: 'speciality-card, SpecialityCard, [speciality-card], [SpecialityCard]',
  host: {
    class: 'ms-cardBackgroundColor ms-cardBackgroundColor--hover p-3 d-block'
  }
})
export class SpecialityCard {
  @Input()
  speciality: Speciality;
}
