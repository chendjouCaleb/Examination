import {Component, Input, Optional} from '@angular/core';
import {DepartmentAddForm} from 'examination/app/components/department/form';
import {DepartmentHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {DepartmentLoader} from 'examination/loaders';
import {School} from 'examination/entities';

@Component({
  templateUrl: 'department-add.html',
  selector: 'div [app-department-add]'
})
export class DepartmentAdd {
  @Input()
  school: School;

  form = new DepartmentAddForm();

  oncancel: () => any;

  constructor(private _httpClient: DepartmentHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: DepartmentLoader,
              @Optional() private _modal: MsfModalRef<DepartmentAdd>) {
  }

  async checkName() {
    const name = this.form.getControl('name');
    if (name.value.match(/^[a-zA-Z0-9]+$/)) {
      const department = await this._httpClient.findByName(this.school, name.value);
      if (department.id) {
        name.addError('Ce nom est déjà utilisé par un autre département.');
      }
    }
  }


  async add() {
    const department = await this._httpClient.addDepartment(this.school, this.form.getModel().body);
    this._alertEmitter.info(`Le département ${department.name} a été ajoutée!`);
    await this._loader.load(department);
    if (this._modal) {
      this._modal.close(department);
    }
  }
}
