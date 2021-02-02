import {Component, Input} from '@angular/core';
import {Department} from 'examination/entities';
import {DepartmentHttpClient} from 'examination/models/http';
import {MsfModalRef} from 'fabric-docs';

@Component({
  templateUrl: 'department-delete.html'
})
export class DepartmentDelete {
  @Input()
  department: Department;

  constructor(private _httpClient: DepartmentHttpClient,
              private _modalRef: MsfModalRef<DepartmentDelete>) {
  }

  async delete() {
    await this._httpClient.delete(this.department.id);

    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
