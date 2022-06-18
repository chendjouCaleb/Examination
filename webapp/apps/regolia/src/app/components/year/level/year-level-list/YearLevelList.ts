import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearLevel} from "examination/entities";

@Component({
  templateUrl: 'YearLevelList.html',
  selector: 'YearLevelList, [YearLevelList], [year-level-list]',
  encapsulation: ViewEncapsulation.None
})
export class YearLevelList implements OnInit {
  @Input()
  yearLevels: YearLevel[];

  constructor() {}

  ngOnInit(): void {

  }
}
