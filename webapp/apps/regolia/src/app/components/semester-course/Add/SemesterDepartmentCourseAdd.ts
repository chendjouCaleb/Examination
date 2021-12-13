import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseHttpClient, SemesterDepartment} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterDepartmentCourseAdd.html'
})
export class SemesterDepartmentCourseAdd {
  semesterDepartment: SemesterDepartment;

  constructor(private _httpClient: SemesterCourseHttpClient,
              private _dialogRef: MsDialogRef<SemesterDepartmentCourseAdd>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterDepartment = data.semesterDepartment;
  }

  async addAll() {
    const items = await this._httpClient.addAddSemesterDepartment(this.semesterDepartment);

    this._alertEmitter.info(`Les cours du département ont été ajoutés au semestre`);
    this._dialogRef.close(items);
  }

}

