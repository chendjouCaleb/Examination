import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import { YearSpeciality} from "examination/entities";

@Component({
  templateUrl: 'YearSpecialityList.html',
  selector: 'YearSpecialityList',
  encapsulation: ViewEncapsulation.None
})
export class YearSpecialityList implements OnInit {
  @Input()
  items: YearSpeciality[];

  constructor() {}

  ngOnInit(): void {

  }
}
