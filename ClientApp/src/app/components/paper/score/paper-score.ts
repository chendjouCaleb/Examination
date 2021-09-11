import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';

import {MsDialogRef} from '@ms-fluent/components';
import {Paper} from 'examination/entities';
import {PaperHttpClient} from 'examination/models';
import {AuthorizationManager} from 'examination/app/authorization';


@Component({
  templateUrl: 'paper-score.html'
})
export class PaperScore implements OnInit {
  @Input()
  paper: Paper;

  score: number = undefined;

  constructor(private _httpClient: PaperHttpClient,
              private _authorization: AuthorizationManager,
              private _dialogRef: MsDialogRef<PaperScore>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {

  }


  async edit() {

    await this._httpClient.score(this.paper, this.score.toString());

    this.paper.isCorrected = true;
    this.paper.score = this.score;
    this.paper.correctorUser = this._authorization.user;
    this.paper.correctorUserId = this._authorization.user.id;
    this._alertEmitter.info('La copie a été notée');
    this._dialogRef.close();
  }

  get isValid(): boolean {
    return this.score >= 0 && this.score <= this.paper.test.radical;
  }
}
