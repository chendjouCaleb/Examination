﻿import {Component, Inject, Input, OnInit} from '@angular/core';
import {Application, ApplicationHttpClient, StudentHttpClient} from 'examination/models';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {List} from '@positon/collections';
import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from '../application.service.interface';

@Component({
  templateUrl: 'application-details.html',
  selector: 'app-application'
})
export class ApplicationDetails implements OnInit {
  @Input()
  application: Application;

  @Input()
  applications = new List();

  constructor(@Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public _applicationService: IApplicationService,
              private _confirmation: Confirmation,
              private _httpClient: ApplicationHttpClient,
              private _studentHttpClient: StudentHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modalRef: MsDialogRef<ApplicationDetails>) {
  }

  ngOnInit(): void {
    this.checkRegistrationId();
  }

  delete() {
    const result = this._confirmation.open('Voulez-vous Supprimer cette demande?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(this.application.id);
      this.applications.remove(this.application);
      this._alertEmitter.info('La demande a été suppriméé!');
      this._modalRef.close();
    });
  }

  registrationIdIsUsed: boolean = false;

  async checkRegistrationId() {
    const student = await this._studentHttpClient
      .findByRegistrationId(this.application.level.department.school, this.application.registrationId);

    this.registrationIdIsUsed = !!(student && student.id);

  }

  accept() {
    this._applicationService.accept(this.application);
  }

  reject() {
    this._applicationService.reject(this.application);
  }
}
