import {Component, Input} from '@angular/core';
import {Department} from 'examination/entities';
import {DepartmentHttpClient} from 'examination/models/http';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'department-delete.html'
})
export class DepartmentDelete {
  @Input()
  department: Department;

  constructor(private _httpClient: DepartmentHttpClient,
              private _modalRef: MsDialogRef<DepartmentDelete>) {
  }

  async delete() {
    await this._httpClient.delete(this.department.id);

    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
