import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import { YearLevelSpeciality} from "examination/entities";

@Component({
  templateUrl: 'YearLevelSpecialityList.html',
  selector: 'YearLevelSpecialityList',
  encapsulation: ViewEncapsulation.None
})
export class YearLevelSpecialityList implements OnInit {
  @Input()
  items: YearLevelSpeciality[];

  constructor() {}

  ngOnInit(): void {

  }
}
