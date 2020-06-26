import {Component, OnInit} from '@angular/core';
import {Examination} from "examination/models";
import {CurrentItems} from "examination/app/current-items";
import {TestService} from "examination/app/test";

@Component({
  selector: 'app-examination-tests',
  templateUrl: './examination-tests.component.html',
  styles: []
})
export class ExaminationTestComponent implements OnInit {
  examination: Examination;


  constructor(currentItems: CurrentItems,
              public _testService: TestService) {
    this.examination = currentItems.get('examination');
  }

  ngOnInit(): void { }

}
