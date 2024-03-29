﻿import {Supervisor, SupervisorHttpClient, SupervisorLoader, Department} from 'examination/models';
import {Injectable} from '@angular/core';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {ISupervisorService} from './supervisor.service.interface';
import {SupervisorAdd} from './add/supervisor-add';
import {List} from '@positon/collections';
import {MsDialog} from "@ms-fluent/components";


@Injectable({providedIn: 'root'})
export class SupervisorService implements ISupervisorService {

  constructor(private _dialog: MsDialog, private _confirmation: Confirmation,
              private _loader: SupervisorLoader,
              private _httpClient: SupervisorHttpClient, private _alertEmitter: AlertEmitter) {
  }


  deleteSupervisor(supervisor: Supervisor): Promise<boolean> {
    const result = this._confirmation.open('Voulez-vous Supprimer ce superviseur?');

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(supervisor.id);
        supervisor.department.supervisors.remove(supervisor);
        this._alertEmitter.info('Le superviseur a été supprimé!');
        resolve(true);
      });
      result.reject.subscribe(() => resolve(false));
    });
  }


  addSupervisors(department: Department): Promise<List<Supervisor>> {
    const modalRef = this._dialog.open(SupervisorAdd, {autoFocus: false, disableClose: true});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

}
