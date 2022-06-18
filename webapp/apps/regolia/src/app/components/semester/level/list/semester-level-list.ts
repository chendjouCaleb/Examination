import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {SemesterLevel} from "examination/entities";

@Component({
  templateUrl: 'semester-level-list.html',
  selector: 'SemesterLevelList, [SemesterLevelList], [semester-level-list]',
  encapsulation: ViewEncapsulation.None
})
export class SemesterLevelList implements OnInit {
  @Input()
  semesterLevels: SemesterLevel[];

  constructor() {}

  ngOnInit(): void {

  }
}
