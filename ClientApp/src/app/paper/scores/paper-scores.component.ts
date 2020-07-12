import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";

import {MsfModalRef} from "fabric-docs";
import {PaperScoreForm} from "../form";
import {Paper, Score} from "examination/entities";
import {PaperHttpClient, ScoreHttpClient} from "examination/models";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'paper-scores.component.html'
})
export class PaperScoresComponent implements OnInit {
  form: PaperScoreForm;

  @Input()
  paper: Paper;

  scores = new List<Score>();

  constructor(private _httpClient: PaperHttpClient,
              private _scoreHttpClient: ScoreHttpClient,
              private _dialogRef: MsfModalRef<PaperScoresComponent>,
              private _alertEmitter: AlertEmitter) { }

  async ngOnInit() {
    this.scores = await this._scoreHttpClient.listByTest(this.paper.testGroup.test);
    this.form = new PaperScoreForm(this.scores);
  }


  async edit() {
    const formModel = this.form.getModel();
    console.log(formModel);
  }
}
