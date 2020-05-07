import {Component, Input, OnInit} from '@angular/core';
import {Examination} from "examination/models";

@Component({
  selector: 'app-examination-layout',
  templateUrl: './examination-layout.component.html',
  styles: []
})
export class ExaminationLayoutComponent implements OnInit {

  @Input()
  examination: Examination = new Examination();
  constructor() { }

  ngOnInit(): void {
  }

}
