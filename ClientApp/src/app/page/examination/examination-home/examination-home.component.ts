import {Component, OnInit} from '@angular/core';
import {Examination, Test} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  selector: 'app-examination-home',
  templateUrl: './examination-home.component.html',
  styleUrls: ['examination-home.component.scss']
})
export class ExaminationHomeComponent implements OnInit {

  examination: Examination;
  test: Test;

  constructor(currentItems: CurrentItems) {
    this.examination = currentItems.get('examination');

    console.log(this.examination);

    const test = new Test();

    test.name = "Physique quantique";
    test.isDone = true;
    test.isCorrected = true;

    this.test = test;
  }

  ngOnInit(): void {
  }

}
