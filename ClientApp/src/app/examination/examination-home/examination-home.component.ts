import { Component, OnInit } from '@angular/core';
import {Test} from "../../../models/entities/test.entity";

@Component({
  selector: 'app-examination-home',
  templateUrl: './examination-home.component.html',
  styleUrls: ['examination-home.component.scss']
})
export class ExaminationHomeComponent implements OnInit {

  test: Test;
  constructor() {
    const test = new Test();

    test.name = "Physique quantique";
    test.isDone = true;
    test.isCorrected = true;

    this.test = test;
  }

  ngOnInit(): void {
  }

}
