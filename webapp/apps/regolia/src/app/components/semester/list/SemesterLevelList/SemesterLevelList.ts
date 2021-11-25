import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterLevel} from "examination/entities";

@Component({
  templateUrl: 'SemesterLevelList.html',
  selector: 'SemesterLevelList',
  encapsulation: ViewEncapsulation.None
})
export class SemesterLevelList implements OnInit {
  @Input()
  items: SemesterLevel[];

  constructor() {}

  ngOnInit(): void {

  }
}
