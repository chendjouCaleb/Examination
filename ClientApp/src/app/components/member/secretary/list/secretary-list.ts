import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Department, Secretary, SecretaryLoader} from 'src/models';
import {ISecretaryService, SECRETARY_SERVICE_TOKEN} from '../secretary.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from "@ms-fluent/components";

@Component({
  templateUrl: 'secretary-list.html',
  selector: 'app-secretary-list'
})
export class SecretaryList implements OnInit {

  @Input()
  department: Department;

  @ViewChild(MsTable)
  table: MsTable;

  isLoading: boolean = true;

  constructor(private _secretaryLoader: SecretaryLoader,
              @Inject(SECRETARY_SERVICE_TOKEN) public _service: ISecretaryService) {
  }

  async ngOnInit() {
    try {
      AssertHelpers.isNotNull(this.department);
      await this._secretaryLoader.loadByDepartment(this.department);
      this.table.unshiftRange(this.department.secretaries.toArray());
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }

  addSecretaries() {
    this._service.addSecretaries(this.department).then(items => this.table.unshift(...items));
  }

  deleteSecretary(item: Secretary) {
    this._service.deleteSecretary(item).then(deleted => {
      if (deleted) {
        this.table.remove(item);
      }
    })
  }

}
