import {Component, Input} from '@angular/core';
import {ExaminationHttpClient, ExaminationLoader, School} from 'examination/models';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {ExaminationAddForm} from 'examination/app/components/examination/examination-form';

@Component({
  selector: 'app-examination-add',
  templateUrl: './examination-add.html'

})
export class ExaminationAdd {
  form = new ExaminationAddForm();

  @Input()
  school: School;

  constructor(private _httpClient: ExaminationHttpClient,
              private _loader: ExaminationLoader,
              private _dialogRef: MsfModalRef<ExaminationAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async checkName() {
    const name = this.form.getControl('name');
    if (name.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const examination = await this._httpClient.findByName(this.school, name.value);
      if (examination && examination.id) {
        name.addError('Le nom est déjà utilisé par un examen');
      }
    }
  }


  async add() {
    const examination = await this._httpClient.add(this.form.getModel(), {schoolId: this.school.id});
    await this._loader.load(examination);
    this._alertEmitter.info(`L'examen' ${examination.name} a été ajoutée.`);
    this.school.statistics.examinationCount++;
    this.school.statistics.waitingExaminationCount++;
    this._dialogRef.close(examination);
  }

}
