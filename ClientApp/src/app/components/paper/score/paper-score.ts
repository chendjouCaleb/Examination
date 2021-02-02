import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";

import {MsfModalRef} from "fabric-docs";
import {Paper} from "examination/entities";
import {PaperHttpClient, ScoreHttpClient, ScorePaperLoader} from "examination/models";
import {FormBuilder} from "@angular/forms";
import {AuthorizationManager} from "examination/app/authorization";


@Component({
  templateUrl: 'paper-score.html'
})
export class PaperScore implements OnInit {
  @Input()
  paper: Paper;

  score: number = undefined;

  constructor(private _httpClient: PaperHttpClient,
              private _authorization: AuthorizationManager,
              private _dialogRef: MsfModalRef<PaperScore>,
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
    this._alertEmitter.info("La copie a été notée");
    this._dialogRef.close();
  }

  get isValid(): boolean {
    return this.score >= 0 && this.score <= this.paper.test.radical;
  }
}
