import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Test, TestScoreHttpClient, TestScoreLoader} from 'src/models';
import {MsDialogRef} from '@ms-fluent/components';
import {TestScoreAddForm} from '../test-score-form';


@Component({
  templateUrl: 'test-score-add.html'
})
export class TestScoreAdd {
  form: TestScoreAddForm = new TestScoreAddForm();

  @Input()
  test: Test;

  constructor(private _httpClient: TestScoreHttpClient,
              private _loader: TestScoreLoader,
              private _dialogRef: MsDialogRef<TestScoreAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  checkRadical() {
    const radical = this.form.getControl('radical');
    const value = +radical.value;
    if (this.test.totalScoreRadical + value > this.test.radical) {
      radical.addError('La somme des radicaux dépasse celui assigné à l\'épreuve');
    }
  }

  async add() {
    const formModel = this.form.getModel();
    const score = await this._httpClient.add(formModel, {testId: this.test.id});
    await this._loader.load(score);
    this.test.testScores.insert(0, score);
    this.test.multipleScore = true;
    this._alertEmitter.info(`La ligne ${score.name} du barème a été ajouté.`);

    if (this._dialogRef) {
      this._dialogRef.close(score);
    }

  }

}
