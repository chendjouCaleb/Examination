import {Component, Input, OnInit, Optional} from '@angular/core';
import {SpecialityEditForm} from 'examination/app/components/speciality/form';
import {SpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {SpecialityLoader} from 'examination/loaders';
import {Speciality} from 'examination/entities';

@Component({
  templateUrl: 'speciality-edit.html',
  selector: 'app-speciality-edit'
})
export class SpecialityEdit implements OnInit {
  @Input()
  speciality: Speciality;

  form: SpecialityEditForm;

  oncancel: () => any;

  constructor(private _httpClient: SpecialityHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: SpecialityLoader,
              @Optional() private _modal: MsDialogRef<SpecialityEdit>) {
  }

  ngOnInit(): void {
    this.form = new SpecialityEditForm(this.speciality);
  }

  async checkName() {
    const name = this.form.getControl('name');
    if (name.value.match(/^[a-zA-Z0-9]+$/)) {
      const speciality = await this._httpClient.findByName(this.speciality.department, name.value);
      if (speciality.id && speciality.id !== this.speciality.id) {
        name.addError('Ce nom est déjà utilisé par une autre spécialité du département.');
      }
    }
  }


  async edit() {
    const body = this.form.getModel();
    const speciality = await this._httpClient.update(this.speciality.id, body);
    this._alertEmitter.info(`La spécialité ${speciality.name} a été modifiée!`);
    await this._loader.load(speciality);
    if (this._modal) {
      this._modal.close(speciality);
    }
  }
}
