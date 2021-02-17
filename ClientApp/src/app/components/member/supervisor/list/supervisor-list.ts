﻿import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Department, Supervisor, SupervisorLoader} from 'src/models';
import {ISupervisorService, SUPERVISOR_SERVICE_TOKEN} from '../supervisor.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'supervisor-list.html',
  selector: 'app-supervisor-list'
})
export class SupervisorList implements OnInit {

  @Input()
  department: Department;

  @ViewChild(MsTable)
  table: MsTable;

  supervisors: Supervisor[] = [];

  constructor( private _supervisorLoader: SupervisorLoader,
               @Inject(SUPERVISOR_SERVICE_TOKEN) public _service: ISupervisorService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._supervisorLoader.loadByDepartment(this.department);
    this.table.unshift(...this.department.supervisors.toArray());
  }

  addSupervisors() {
    this._service.addSupervisors(this.department).then(items => this.table.unshift(...items));
  }

  deleteSupervisor(item: Supervisor) {
    this._service.deleteSupervisor(item).then(deleted => {
      if (deleted) {
        this.table.remove(item);
      }
    })
  }


}