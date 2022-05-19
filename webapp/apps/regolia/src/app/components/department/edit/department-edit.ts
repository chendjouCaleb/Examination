import {Component, Input, OnInit} from '@angular/core';
import {Department} from 'examination/entities';
import {DepartmentEditForm} from 'examination/app/components/department/form';
import {DepartmentHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'department-edit.html'
})
export class DepartmentEdit implements OnInit {
  @Input()
  department: Department;


  form: DepartmentEditForm;

  constructor(private _httpClient: DepartmentHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modalRef: MsDialogRef<DepartmentEdit>) {
  }

  ngOnInit(): void {
    this.form = new DepartmentEditForm(this.department);
  }

  async edit() {
    const model = this.form.getModel();
    await this._httpClient.updateAsync(this.department.id, model);

    this.department.name = model.name;
    this.department.acronym = model.acronym;
    this.department.address = model.address;

    this._alertEmitter.info(`Les informations ont été modifiée.`);

    if (this._modalRef) {
      this._modalRef.close();
    }
  }
}
