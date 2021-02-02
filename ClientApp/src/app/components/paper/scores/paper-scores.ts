import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";

import {MsfModalRef} from "fabric-docs";
import {PaperScoreForm} from "../form";
import {Paper, TestScore} from "examination/entities";
import {PaperHttpClient, ScorePaperLoader, TestScoreHttpClient} from "examination/models";
import {List} from "@positon/collections";
import {FormBuilder} from "@angular/forms";
import {AuthorizationManager} from "examination/app/authorization";
import {sum} from 'src/controls/array';


@Component({
  templateUrl: 'paper-scores.html'
})
export class PaperScores implements OnInit {
  form: PaperScoreForm;

  @Input()
  paper: Paper;

  scores = new List<TestScore>();

  radical: number = 0;
  sum: number = 0;

  constructor(private _httpClient: PaperHttpClient,
              private _formBuilder: FormBuilder,
              private _scoreHttpClient: TestScoreHttpClient,
              private _scorePaperLoader: ScorePaperLoader,
              private _authorization: AuthorizationManager,
              private _dialogRef: MsfModalRef<PaperScores>,
              private _alertEmitter: AlertEmitter) { }

  async ngOnInit() {
    this.scores = await this._scoreHttpClient.listByTest(this.paper.test);
    this.form = new PaperScoreForm(this.scores, this.paper.scorePapers);

    if(this.paper.scorePapers){
      this.sum = sum(this.paper.scorePapers, v => v.value);
    }

    this.radical = sum(this.scores.toArray(), u => u.radical);

    this.form.valueChanges.subscribe(() => {
      this.sum = sum(this.form.getModel(), u => u.value);
    })
  }


  async edit() {
    const formModel = this.form.getModel();
    const result = await this._httpClient.scores(this.paper, formModel);


    await this._scorePaperLoader.loadAll(result);

    this.paper.isCorrected = true;
    this.paper.score = this.sum;
    this.paper.correctorUser = this._authorization.user;
    this.paper.correctorUserId = this._authorization.user.id;
    this.paper.scorePapers =  result;
    this._alertEmitter.info("La copie a été notée");
    this._dialogRef.close();
  }
}
