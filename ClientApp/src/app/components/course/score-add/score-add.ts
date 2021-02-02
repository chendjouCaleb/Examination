import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Course, ScoreHttpClient, ScoreLoader} from 'src/models';
import {MsfModalRef} from 'fabric-docs';
import {ScoreAddForm} from '../score-form';


@Component({
  templateUrl: 'score-add.html'
})
export class ScoreAdd {
  form: ScoreAddForm = new ScoreAddForm();

  @Input()
  course: Course;

  constructor(private _httpClient: ScoreHttpClient,
              private _loader: ScoreLoader,
              private _dialogRef: MsfModalRef<ScoreAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  checkRadical() {
    const radical = this.form.getControl('radical');
    const value = +radical.value;
    if (this.course.totalScoreRadical + value > this.course.radical) {
      radical.addError('La somme des radicaux dépasse celui assigné au cours');
    }
  }

  async add() {
    const formModel = this.form.getModel();
    const score = await this._httpClient.add(formModel, {courseId: this.course.id});
    await this._loader.load(score);
    this.course.scores.insert(0, score);
    this.course.multipleScore = true;
    this._alertEmitter.info(`La ligne ${score.name} du barème a été ajouté.`);

    if (this._dialogRef) {
      this._dialogRef.close(score);
    }

  }

  cancel() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }
}
