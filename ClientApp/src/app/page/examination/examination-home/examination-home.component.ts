import {Component, OnInit} from '@angular/core';
import {Examination, ExaminationHttpClient, Test} from 'examination/models';
import {CurrentItems} from 'examination/app/current-items';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {ExaminationService} from "examination/app/examination/examination.service";

@Component({
  selector: 'app-examination-home',
  templateUrl: './examination-home.component.html',
  styleUrls: ['examination-home.component.scss']
})
export class ExaminationHomeComponent implements OnInit {

  examination: Examination;
  test: Test;

  constructor(currentItems: CurrentItems,
              private _examinationService: ExaminationService) {
    this.examination = currentItems.get('examination');

    const test = new Test();

    test.name = 'Physique quantique';
    test.isDone = true;
    test.isCorrected = true;

    this.test = test;
  }

  ngOnInit(): void {
  }


  start() {
    this._examinationService.start(this.examination);
  }

  relaunch() {
    this._examinationService.relaunch(this.examination);
  }

  end() {
    this._examinationService.end(this.examination);
  }

  reload() {
    this._examinationService.reload(this.examination);
  }

}
