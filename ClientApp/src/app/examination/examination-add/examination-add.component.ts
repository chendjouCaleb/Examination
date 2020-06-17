import {Component, Input} from '@angular/core';
import {ExaminationAddForm} from "examination/app/examination/form";
import {ExaminationHttpClient, ExaminationLoader, Organisation} from "examination/models";
import {AlertEmitter} from "examination/controls";
import {MsfModalRef} from "fabric-docs";

@Component({
  selector: 'app-examination-add',
  templateUrl: './examination-add.component.html'

})
export class ExaminationAddComponent {
  form = new ExaminationAddForm();

  @Input()
  organisation: Organisation;

  constructor(private _httpClient: ExaminationHttpClient, private _loader: ExaminationLoader,
              private _dialogRef: MsfModalRef<ExaminationAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async checkName() {
    const name = this.form.getControl("name");
    if (name.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const examination = await this._httpClient.findByName(this.organisation, name.value);
      if (examination && examination.id) {
        name.addError("Le nom est déjà utilisé par un examen");
      }
    }
  }


  async add() {
    let examination = await this._httpClient.add(this.form.getModel(), {organisationId: this.organisation.id});
    await this._loader.load(examination);
    this._alertEmitter.info(`L'examen' ${examination.name} a été ajoutée.`);
    this.organisation.statistics.examinationCount++;
    this.organisation.statistics.waitingExaminationCount++;
    this._dialogRef.close(examination);
  }

}
