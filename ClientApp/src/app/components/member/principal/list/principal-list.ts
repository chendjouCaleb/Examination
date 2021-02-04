import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Department, Principal, PrincipalLoader} from 'src/models';
import {IPrincipalService, PRINCIPAL_SERVICE_TOKEN} from '../principal.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'principal-list.html',
  selector: 'app-principal-list'
})
export class PrincipalList implements OnInit {

  @Input()
  department: Department;

  @ViewChild(MsTable)
  table: MsTable<Principal>;

  correctors: Principal[] = [];

  constructor( private _principalLoader: PrincipalLoader,
               @Inject(PRINCIPAL_SERVICE_TOKEN) public _service: IPrincipalService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._principalLoader.loadByDepartment(this.department);
    this.table.unshift(...this.department.principals);
  }

  addPrincipals() {
    this._service.addPrincipals(this.department).then(items => this.table.unshift(...items));
  }

  deletePrincipal(item: Principal) {
    this._service.deletePrincipal(item).then(deleted => {
      if (deleted) {
        this.table.remove(item);
      }
    })
  }


}
