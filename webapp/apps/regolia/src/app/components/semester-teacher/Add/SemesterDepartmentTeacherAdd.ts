import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {Semester, SemesterDepartment, SemesterTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';
import {SemesterTeacherAdd} from "./SemesterTeacherAdd";


@Component({
  templateUrl: 'SemesterDepartmentTeacherAdd.html'
})
export class SemesterDepartmentTeacherAdd {
  semesterDepartment: SemesterDepartment;

  constructor(private _httpClient: SemesterTeacherHttpClient,
              private _dialogRef: MsDialogRef<SemesterDepartmentTeacherAdd>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterDepartment = data.semesterDepartment;
  }

  async addAll() {
    const items = await this._httpClient.addAllDepartmentTeachers(this.semesterDepartment);

    this._alertEmitter.info(`Les enseignants ont été ajoutés au semestre`);
    this._dialogRef.close(items);
  }

}

