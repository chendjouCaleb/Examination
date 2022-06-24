import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import { SemesterSpeciality} from "examination/entities";

@Component({
  templateUrl: 'semester-speciality-list.html',
  selector: 'SemesterSpecialityList, [SemesterSpecialityList], [semester-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class SemesterSpecialityList implements OnInit {
  @Input()
  semesterSpecialities: SemesterSpeciality[];

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  constructor() {}

  ngOnInit(): void {

  }
}
