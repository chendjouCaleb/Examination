import {Component} from '@angular/core';
import {StudentAdd} from '../student-add';
import {StudentContactForm} from '../../student-form';
import {StudentHttpClient} from 'examination/models/http';

@Component({
  templateUrl: 'student-add-contact.html',
  selector: 'student-add-contact'
})
export class StudentAddContact {
  form = new StudentContactForm();

  constructor(private _httpClient: StudentHttpClient,
              private _parent: StudentAdd) {

  }


  next() {
    if (this.form.invalid) {
      return;
    }

    const model = this.form.getModel();

    this._parent.model.email = model.email;
    this._parent.model.phoneNumber = model.phoneNumber;
    this._parent.model.address = model.address;

    this._parent.stepper.next();
  }
}
