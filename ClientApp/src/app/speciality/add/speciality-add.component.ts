import {Component, Input} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Examination, SpecialityHttpClient, SpecialityLoader} from "src/models";
import {SpecialityAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'speciality-add.component.html'
})
export class SpecialityAddComponent {
  form = new SpecialityAddForm();
  userId: string;

  @Input()
  examination: Examination;

  constructor(private _httpClient: SpecialityHttpClient, private _loader: SpecialityLoader,
              private _dialogRef: MsfModalRef<SpecialityAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async checkName() {
    const name = this.form.getControl("name");
    if (name.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const speciality = await this._httpClient.findByName(this.examination, name.value);
      if (speciality && speciality.id) {
        name.addError("Le nom est déjà utilisé par une spécialité");
      }
    }
  }


  async add() {
    let speciality = await this._httpClient.add(this.form.getModel(), {examinationId: this.examination.id});
    await this._loader.load(speciality);
    this._alertEmitter.info(`La spécialité ${speciality.name} a été ajoutée.`);
    this._dialogRef.close(speciality);
  }
}
