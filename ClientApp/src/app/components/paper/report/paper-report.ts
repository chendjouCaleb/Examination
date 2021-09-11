import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';

import {MsDialogRef} from '@ms-fluent/components';
import {PaperReportForm} from '../form';
import {Paper} from 'examination/entities';
import {PaperHttpClient} from 'examination/models';
import {AuthorizationManager} from 'examination/app/authorization';


@Component({
  templateUrl: 'paper-report.html'
})
export class PaperReport implements OnInit {
  form: PaperReportForm;

  @Input()
  paper: Paper;

  constructor(private _httpClient: PaperHttpClient,
              private _auth: AuthorizationManager,
              private _dialogRef: MsDialogRef<PaperReport>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {
    this.form = new PaperReportForm();
  }

  async edit() {
    const formModel = this.form.getModel();
    const paper = await this._httpClient.report(this.paper, formModel);

    this.paper.secretaryComment = formModel.comment;
    this.paper.anonymity = formModel.anonymity;

    this.paper.secretaryUser = this._auth.user;
    this.paper.secretaryUserId = this._auth.user.id;

    this._alertEmitter.info(`La copie a été consignée.`);
    this._dialogRef.close(paper);
  }
}
