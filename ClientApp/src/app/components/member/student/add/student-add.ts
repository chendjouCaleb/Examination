
import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {AlertEmitter} from 'src/controls/alert-emitter';
import {
  Level,
  LevelSpeciality,
  LevelSpecialityHttpClient,
  LevelSpecialityLoader, StudentAddModel,
  StudentHttpClient,
  StudentLoader
} from 'src/models';
import {MsDialogRef, MsStepper} from '@ms-fluent/components';
import {StudentAddOptions} from './student-add-options';

@Component({
  templateUrl: 'student-add.html'
})
export class StudentAdd implements OnInit {

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
              private _loader: StudentLoader,
              private _modalRef: MsDialogRef<StudentAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {

  }




  async add() {
    const student = await this._httpClient.addStudent(this.model.body, this.model.params);
    await this._loader.load(student);

    student.level = this.level;
    student.levelSpeciality = this.levelSpeciality;
    this.level.students.insert(0, student);
    this.levelSpeciality?.students.insert(0, student);
    this._alertEmitter.info(`L'étudiant ${student.fullName} a été ajouté!`);

    if (this._modalRef) {
      this._modalRef.close(student);
    }
  }

  cancel() {
    if (this._modalRef) {
      this._modalRef.close();
    }
  }
}

