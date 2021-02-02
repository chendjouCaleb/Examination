import {Component, Inject, Input, OnInit} from '@angular/core';
import {SupervisorLoader, Department} from 'src/models';
import {CurrentItems} from 'src/app/current-items';
import {SUPERVISOR_SERVICE_TOKEN, ISupervisorService} from "../supervisor.service.interface";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

@Component({
  templateUrl: 'supervisor-list.html',
  selector: 'app-supervisor-list'
})
export class SupervisorList implements OnInit {

  @Input()
  department: Department;

  constructor( private _supervisorLoader: SupervisorLoader,
               @Inject(SUPERVISOR_SERVICE_TOKEN) public _service: ISupervisorService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._supervisorLoader.loadByDepartment(this.department);
  }


}
