import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import { YearSpeciality} from "examination/entities";

@Component({
  templateUrl: 'YearSpecialityList.html',
  selector: 'YearSpecialityList, [YearSpecialityList], [year-speciality-list]',
  encapsulation: ViewEncapsulation.None
})
export class YearSpecialityList implements OnInit {
  @Input()
  yearSpecialities: YearSpeciality[];

  constructor() {}

  ngOnInit(): void {

  }
}
