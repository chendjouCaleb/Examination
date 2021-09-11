import {Component} from '@angular/core';
import {ImageFormValue} from 'examination/controls';
import {StudentHttpClient} from 'examination/models/http';
import {StudentAdd} from '../student-add';

@Component({
  templateUrl: 'student-add-image.html',
  selector: 'student-add-image'
})
export class StudentAddImage {

  value: ImageFormValue;

  constructor(private _httpClient: StudentHttpClient,
              private _parent: StudentAdd) {

  }


  next() {
    this._parent.stepper.next();
  }

  select() {
    if (this.value) {
      this._parent.model.imageBlob = this.value.blob;
      this._parent.model.imageUrl = this.value.url;
    }
  }

  onchange(value: ImageFormValue){
    this.value = value;
  }


}
