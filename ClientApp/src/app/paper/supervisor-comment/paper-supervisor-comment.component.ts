import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";

import {MsfModalRef} from "fabric-docs";
import {Paper} from "examination/entities";
import {PaperHttpClient} from "examination/models";


@Component({
  templateUrl: 'paper-supervisor-comment.component.html'
})
export class PaperSupervisorCommentComponent implements OnInit {
  comment: string;

  @Input()
  paper: Paper;

  constructor(private _httpClient: PaperHttpClient,
              private _dialogRef: MsfModalRef<PaperSupervisorCommentComponent>,
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
