import {Component, Inject, Input, OnInit} from '@angular/core';
import {Department, PrincipalLoader} from 'src/models';
import {IPrincipalService, PRINCIPAL_SERVICE_TOKEN} from "../principal.service.interface";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

@Component({
  templateUrl: 'principal-list.html',
  selector: 'app-principal-list'
})
export class PrincipalList implements OnInit {

  @Input()
  department: Department;

  constructor( private _principalLoader: PrincipalLoader,
              @Inject(PRINCIPAL_SERVICE_TOKEN) public _service: IPrincipalService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._principalLoader.loadByDepartment(this.department);
  }


}
