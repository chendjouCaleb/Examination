import {Component, Inject, Input, OnInit} from '@angular/core';
import {Department, SecretaryLoader} from 'src/models';
import {ISecretaryService, SECRETARY_SERVICE_TOKEN} from "../secretary.service.interface";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

@Component({
  templateUrl: 'secretary-list.html',
  selector: 'app-secretary-list'
})
export class SecretaryList implements OnInit {

  @Input()
  department: Department;

  constructor( private _secretaryLoader: SecretaryLoader,
              @Inject(SECRETARY_SERVICE_TOKEN) public _service: ISecretaryService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._secretaryLoader.loadByDepartment(this.department);
  }


}
