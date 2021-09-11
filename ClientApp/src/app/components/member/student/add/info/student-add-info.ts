import {Component} from '@angular/core';
import {StudentHttpClient} from 'examination/models/http';
import {StudentAdd} from '../student-add';
import {StudentInfoForm} from '../../student-form';

@Component({
  templateUrl: 'student-add-info.html',
  selector: 'student-add-info'
})
export class StudentAddInfo {
  form = new StudentInfoForm();

  constructor(private _httpClient: StudentHttpClient,
              private _parent: StudentAdd) {

  }


  next() {
    if (this.form.invalid) {
      return;
    }

    const model = this.form.getModel();

    this._parent.model.fullName = model.fullName;
    this._parent.model.birthDate = model.birthDate;
    this._parent.model.birthPlace = model.birthPlace;
    this._parent.model.gender = model.gender;

    this._parent.stepper.next();
  }
}
