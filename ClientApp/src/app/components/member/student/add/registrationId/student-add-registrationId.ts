import {Component} from '@angular/core';
import {StudentAdd } from '../student-add';
import {StudentHttpClient} from 'examination/models/http';
import {StudentRegistrationIdForm} from '../../student-form';

@Component({
  templateUrl: 'student-add-registrationId.html',
  selector: 'student-add-registrationId'
})
export class StudentAddRegistrationId {
  constructor(private _httpClient: StudentHttpClient,
              private _parent: StudentAdd) {}

  form = new StudentRegistrationIdForm();

  correctRegistrationId: boolean = false;

  async checkRegistrationId() {
    const registrationId = this.form.getControl('registrationId');
    if (registrationId.value.match(/^[a-zA-Z0-9]+$/)) {
      const student = await this._httpClient.findByRegistrationId(this._parent.options.school, registrationId.value);
      if (student && student.id) {
        registrationId.addError('Le matricule est déjà utilisé par un autre étudiant !');
        this.correctRegistrationId = false;
      }else {
        this.correctRegistrationId = true;
      }
    }
  }

  async next() {
    await this.checkRegistrationId();

    if (this.form.invalid) {
      return;
    }

    const model = this.form.getModel();

    this._parent.model.registrationId = model.registrationId;

    this._parent.stepper.next();
  }
}
