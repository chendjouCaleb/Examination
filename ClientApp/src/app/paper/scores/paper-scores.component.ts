import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";

import {MsfModalRef} from "fabric-docs";
import {PaperScoreForm} from "../form";
import {Paper, Score} from "examination/entities";
import {PaperHttpClient, ScoreHttpClient} from "examination/models";
import {List} from "@positon/collections";
import {FormBuilder} from "@angular/forms";
import {sum} from "../../../controls/array";


@Component({
  templateUrl: 'paper-scores.component.html'
})
export class PaperScoresComponent implements OnInit {
  form: PaperScoreForm;

  @Input()
  paper: Paper;

  scores = new List<Score>();

  radical: number = 0;
  sum: number = 0;

  constructor(private _httpClient: PaperHttpClient,
              private _formBuilder: FormBuilder,
              private _scoreHttpClient: ScoreHttpClient,
              private _dialogRef: MsfModalRef<PaperScoresComponent>,
              private _alertEmitter: AlertEmitter) { }

  async ngOnInit() {
    this.scores = await this._scoreHttpClient.listByTest(this.paper.testGroup.test);
    this.form = new PaperScoreForm(this.scores);

    this.radical = sum(this.scores.toArray(), u => u.radical);

    this.form.valueChanges.subscribe(() => {
      this.sum = sum(this.form.getModel(), u => u.value);
    })
  }


  async edit() {
    const formModel = this.form.getModel();
    const result = await this._httpClient.scores(this.paper, formModel);
    console.log(result);
  }
}
