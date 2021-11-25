import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {YearLevel} from "examination/entities";

@Component({
  templateUrl: 'YearLevelList.html',
  selector: 'YearLevelList',
  encapsulation: ViewEncapsulation.None
})
export class YearLevelList implements OnInit {
  @Input()
  items: YearLevel[];

  constructor() {}

  ngOnInit(): void {

  }
}
