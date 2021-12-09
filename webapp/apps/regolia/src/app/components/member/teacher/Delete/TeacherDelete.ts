import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {Teacher, TeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'TeacherDelete.html'
})
export class TeacherDelete {
  teacher: Teacher;

  constructor(private _httpClient: TeacherHttpClient,
              private _dialogRef: MsDialogRef<TeacherDelete>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.teacher = data.teacher;
  }

  async delete() {
    await this._httpClient.delete(this.teacher.id);

    this._alertEmitter.info(`L'enseignant a été supprimé`);
    this._dialogRef.close(true);
  }

}

