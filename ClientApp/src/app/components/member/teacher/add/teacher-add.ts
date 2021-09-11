import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {TeacherHttpClient, TeacherLoader, Department, User, UserHttpClient} from 'examination/models';
import {MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'teacher-add.html'
})
export class TeacherAdd {
  @Input()
  department: Department;

  users: User[] = [];

  constructor(private _httpClient: TeacherHttpClient, private _loader: TeacherLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsDialogRef<TeacherAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const teachers = await this._httpClient.addTeachers(this.department, ids);

    for (const teacher of teachers) {
      await this._loader.load(teacher);
    }

    this.department.teachers.insertRange(teachers, 0);
    this._alertEmitter.info(`${teachers.size()} enseignant(s) ont été ajouté(s).`);

    if (this._dialogRef) {
      this._dialogRef.close(teachers);
    }
  }

}

