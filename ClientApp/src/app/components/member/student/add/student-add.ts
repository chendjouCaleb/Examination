import {Component, Input, ViewChild} from '@angular/core';

import {AlertEmitter} from 'src/controls/alert-emitter';
import {
  Level,
  LevelSpeciality,
  LevelSpecialityHttpClient,
  LevelSpecialityLoader,
  StudentAddModel,
  StudentHttpClient,
  StudentLoader
} from 'src/models';
import {MsDialogRef, MsStepper} from '@ms-fluent/components';
import {StudentAddOptions} from './student-add-options';

@Component({
  templateUrl: 'student-add.html'
})
export class StudentAdd {

  @ViewChild(MsStepper)
  stepper: MsStepper;

  @Input()
  options: StudentAddOptions;
  model = new StudentAddModel();

  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;

  constructor(private _httpClient: StudentHttpClient,
              private _levelSpecialityHttpClient: LevelSpecialityHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              public _loader: StudentLoader,
              public _modalRef: MsDialogRef<StudentAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  cancel() {
    if (this._modalRef) {
      this._modalRef.close();
    }
  }
}

