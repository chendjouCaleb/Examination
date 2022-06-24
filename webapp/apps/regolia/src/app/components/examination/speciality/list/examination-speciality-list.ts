import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import { ExaminationSpeciality} from "examination/entities";

@Component({
  templateUrl: 'examination-speciality-list.html',
  selector: 'ExaminationSpecialityList, [ExaminationSpecialityList], [examination-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class ExaminationSpecialityList implements OnInit {
  @Input()
  examinationSpecialities: ExaminationSpeciality[];

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  constructor() {}

  ngOnInit(): void {

  }
}
