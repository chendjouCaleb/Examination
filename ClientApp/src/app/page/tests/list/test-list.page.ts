import {Component, OnInit} from '@angular/core';
import {Examination} from "examination/models";
import {CurrentItems} from "examination/app/current-items";
import {TestService} from "examination/app/test";

@Component({
  templateUrl: './test-list.page.html'
})
export class TestListPage implements OnInit {
  examination: Examination;


  constructor(currentItems: CurrentItems,
              public _testService: TestService) {
    this.examination = currentItems.get('examination');
  }

  ngOnInit(): void { }

}
