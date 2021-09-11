﻿import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Application, ApplicationHttpClient} from 'src/models';
import {ApplicationInfoForm} from '../form';
import {MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'application-edit.html'
})
export class ApplicationEdit implements OnInit {
  form: ApplicationInfoForm;

  @Input()
  application: Application;

  constructor(private _httpClient: ApplicationHttpClient,
              private _dialogRef: MsDialogRef<ApplicationEdit>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {
    this.form = new ApplicationInfoForm(this.application);
  }


  async edit() {
    const model = this.form.getModel();
    await this._httpClient.update(this.application.id, model);

    this.application.fullName = model.fullName;
    this.application.gender = model.gender;
    this.application.birthDate = model.birthDate;
    this.application.registrationId = model.registrationId;
    this._alertEmitter.info(`La demande a été modifiée.`);
    this._dialogRef.close();
  }
}

