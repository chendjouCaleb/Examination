import {Component, Input, Optional} from '@angular/core';
import {SpecialityAddForm} from 'examination/app/components/speciality/form';
import {LevelHttpClient, SpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {LevelSpecialityLoader, SpecialityLoader} from 'examination/loaders';
import {Department} from 'examination/entities';

@Component({
  templateUrl: 'speciality-add.html',
  selector: 'app-speciality-add'
})
export class SpecialityAdd {
  @Input()
  department: Department;

  form = new SpecialityAddForm();


  oncancel: () => any;

  constructor(private _httpClient: SpecialityHttpClient,
              private _levelHttpClient: LevelHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: SpecialityLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Optional() private _modal: MsDialogRef<SpecialityAdd>) {
  }

  async checkName() {
    const name = this.form.getControl('name');
    if (name.value.match(/^[a-zA-Z0-9]+$/)) {
      if (this.department.specialities.find(s => s.name === name.value)) {
        name.addError('Ce nom est déjà utilisé par une autre spécialité du département.');
      }
    }
  }


  async add() {
    const body = this.form.getModel().body;
    const params = this.form.getModel().params;
    const speciality = await this._httpClient.addSpeciality(this.department, body, params);

    this._alertEmitter.info(`La spécialité ${speciality.name} a été ajoutée!`);
    await this._loader.load(speciality);
    await this._levelSpecialityLoader.loadBySpeciality(speciality);
    this.department.addLevelSpecialities(speciality.levelSpecialities);
    this.department.specialities.insert(0, speciality);

    if (this._modal) {
      this._modal.close(speciality);
    }
  }
}
