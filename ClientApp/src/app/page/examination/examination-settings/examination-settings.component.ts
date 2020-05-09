import { Component, OnInit } from '@angular/core';
import {Examination, ExaminationHttpClient} from "examination/models";
import {CurrentItems} from "examination/app/current-items";
import {ExaminationDateForm, ExaminationNameForm} from "examination/app/examination";
import {AlertEmitter, Confirmation} from "examination/controls";

@Component({
  selector: 'app-examination-settings',
  templateUrl: './examination-settings.component.html',
  styles: []
})
export class ExaminationSettingsComponent implements OnInit {
  examination: Examination;

  nameForm: ExaminationNameForm;
  startDateForm: ExaminationDateForm;
  endDateForm: ExaminationDateForm;

  constructor(currentItems: CurrentItems,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _httpClient: ExaminationHttpClient) {
    this.examination = currentItems.get('examination');
  }

  ngOnInit(): void {
    this.nameForm = new ExaminationNameForm(this.examination.name);
    this.startDateForm = new ExaminationDateForm(this.examination.expectedStartDate);
    this.endDateForm = new ExaminationDateForm(this.examination.expectedEndDate);
  }

  reset() { }

  async editName() {
    await this._httpClient.changeName(this.examination, this.nameForm.control.value);
    this._alertEmitter.info("Le nom de l'examen a été modifié");
  }

  async editStartDate() {
    await this._httpClient.changeStartDate(this.examination, this.startDateForm.control.value.toISOString());

    this._alertEmitter.info("La date de démarrage l'examen a été modifiée");
  }

  async editEndDate(){
    await this._httpClient.changeEndDate(this.examination, this.endDateForm.control.value.toISOString());
    this._alertEmitter.info("La date de fermeture l'examen a été modifiée");
  }


}
