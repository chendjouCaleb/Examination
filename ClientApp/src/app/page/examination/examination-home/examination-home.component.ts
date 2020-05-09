import {Component, OnInit} from '@angular/core';
import {Examination, ExaminationHttpClient, Test} from "examination/models";
import {CurrentItems} from "examination/app/current-items";
import {AlertEmitter, Confirmation} from "examination/controls";

@Component({
  selector: 'app-examination-home',
  templateUrl: './examination-home.component.html',
  styleUrls: ['examination-home.component.scss']
})
export class ExaminationHomeComponent implements OnInit {

  examination: Examination;
  test: Test;

  constructor(currentItems: CurrentItems,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _httpClient: ExaminationHttpClient) {
    this.examination = currentItems.get('examination');

    const test = new Test();

    test.name = "Physique quantique";
    test.isDone = true;
    test.isCorrected = true;

    this.test = test;
  }

  ngOnInit(): void {
  }

  start() {
    const confirmation = this._confirmation.open("Voulez-vous commencer cet examen?");

    confirmation.accept.subscribe(async () => {
      await this._httpClient.start(this.examination);
      this.examination.startDate = new Date();
      this._alertEmitter.info("L'examen a débuté.");
    });
  }


  end() {
    const confirmation = this._confirmation.open("Voulez-vous fermer cet examen?");

    confirmation.accept.subscribe(async () => {
      await this._httpClient.close(this.examination);
      this.examination.endDate = new Date();
      this._alertEmitter.info("L'examen a été fermé.");
    });
  }

  relaunch() {
    const confirmation = this._confirmation.open("Voulez-vous relancer cet examen?");

    confirmation.accept.subscribe(async () => {
      await this._httpClient.relaunch(this.examination);
      this.examination.endDate = null;
      this._alertEmitter.info("L'examen a été relancé.");
    });
  }

}
