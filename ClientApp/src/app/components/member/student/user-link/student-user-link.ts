﻿import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Student, StudentHttpClient, User} from 'src/models';
import {MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'student-user-link.html'
})
export class StudentUserLink {
  @Input()
  student: Student;

  user: User;

  constructor(private _httpClient: StudentHttpClient,
              private _dialogRef: MsDialogRef<StudentUserLink>,
              private _alertEmitter: AlertEmitter) {
  }


  async link() {
    await this._httpClient.changeUserId(this.student, this.user.id);
    this.student.user = this.user;
    this._alertEmitter.info(`L'étudiant ${this.student.fullName} a été lié à l'utilisateur ${this.user.fullName}.`);

    if (this._dialogRef) {
      this._dialogRef.close(this.user);
    }
  }

  cancel() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }
}

