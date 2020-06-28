import {Component, Input} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {ScoreHttpClient, ScoreLoader, Test} from "src/models";
import {MsfModalRef} from "fabric-docs";
import {ScoreAddForm} from "examination/app/test/score-form";


@Component({
  templateUrl: 'score-add.component.html'
})
export class ScoreAddComponent{
  form:ScoreAddForm = new ScoreAddForm();

  @Input()
  test: Test;

  constructor(private _httpClient: ScoreHttpClient,
              private _loader: ScoreLoader,
              private _dialogRef: MsfModalRef<ScoreAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  checkRadical() {
    const radical = this.form.getControl("radical");
    const value = +radical.value;
    if (this.test.totalScoreRadical + value > this.test.radical) {
      radical.addError("La somme des radicaux dépasse celui assigné à l'épreuve");
    }
  }

  async add() {
    const formModel = this.form.getModel();
    let score = await this._httpClient.add(formModel, {testId: this.test.id});
    await this._loader.load(score);
    this.test.scores.insert(0, score);
    this._alertEmitter.info(`La ligne ${score.name} du barème a été ajouté.`);
    this._dialogRef.close(score);
  }
}
