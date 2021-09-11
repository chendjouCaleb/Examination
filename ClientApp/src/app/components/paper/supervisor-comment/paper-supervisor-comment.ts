﻿import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {MsDialogRef} from '@ms-fluent/components';
import {Paper} from 'examination/entities';
import {PaperHttpClient} from 'examination/models';


@Component({
  templateUrl: 'paper-supervisor-comment.html'
})
export class PaperSupervisorComment implements OnInit {
  comment: string;

  @Input()
  paper: Paper;

  constructor(private _httpClient: PaperHttpClient,
              private _dialogRef: MsDialogRef<PaperSupervisorComment>,
              private _alertEmitter: AlertEmitter) {
  }

  ngOnInit() {
    this.comment = this.paper.supervisorComment;
  }


  async edit() {
    await this._httpClient.supervisorComment(this.paper, this.comment);
    this.paper.supervisorComment = this.comment;
    this._alertEmitter.info(`Commentaire de surveillance modifié.`);
    this._dialogRef.close(this.paper);
  }
}
