import {Component, Input} from '@angular/core';
import {Examination} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  selector: 'app-examination-layout',
  templateUrl: './examination-layout.component.html',
  styles: []
})
export class ExaminationLayoutComponent {

  @Input()
  examination: Examination = new Examination();

  constructor(currentItems: CurrentItems) {
    this.examination = currentItems.get("examination");
  }

}
