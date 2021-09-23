import {Component} from '@angular/core';
import {ImageFormDialog, ImageFormValue} from 'examination/controls';
import {StudentHttpClient} from 'examination/models/http';
import {StudentAdd} from '../student-add';
import {StudentAddModel} from "examination/models";

@Component({
  templateUrl: 'student-add-image.html',
  selector: 'student-add-image'
})
export class StudentAddImage {

  value: ImageFormValue;

  constructor(private _httpClient: StudentHttpClient,
              private _imageFormDialog: ImageFormDialog,
              private _parent: StudentAdd) {

  }

  open() {
    this._imageFormDialog.open().subscribe(result => {
      if (result && result.url) {
        this._parent.model.imageUrl = result.url;
        this._parent.model.imageBlob = result.blob;
      }
    });
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

  onchange(value: ImageFormValue) {
    this.value = value;
  }

  get model(): StudentAddModel {
    return this._parent.model;
  }


}
