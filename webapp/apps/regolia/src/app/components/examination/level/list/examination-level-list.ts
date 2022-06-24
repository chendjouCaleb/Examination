import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ExaminationLevel} from "examination/entities";

@Component({
  templateUrl: 'examination-level-list.html',
  selector: 'ExaminationLevelList, [ExaminationLevelList], [examination-level-list]',
  encapsulation: ViewEncapsulation.None
})
export class ExaminationLevelList implements OnInit {
  @Input()
  examinationLevels: ExaminationLevel[];

  @Input('listStyle')
  style: 'date' | 'card' = 'card';

  constructor() {}

  ngOnInit(): void {

  }
}
