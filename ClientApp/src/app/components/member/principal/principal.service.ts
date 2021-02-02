﻿import {Principal, PrincipalHttpClient, PrincipalLoader, Department} from 'examination/models';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {IPrincipalService} from './principal.service.interface';
import {PrincipalAdd} from './add/principal-add';
import {List} from '@positon/collections';


@Injectable({providedIn: 'root'})
export class PrincipalService implements IPrincipalService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _loader: PrincipalLoader,
              private _httpClient: PrincipalHttpClient,
              private _alertEmitter: AlertEmitter) {
  }


  deletePrincipal(principal: Principal): Promise<void> {
    const result = this._confirmation.open('Voulez-vous Supprimer ce délégué?');

    return new Promise<void>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(principal.id);
        principal.department.principals.remove(principal);
        this._alertEmitter.info('Le délégué a été supprimé!');
      });
      resolve();
    });
  }


  addPrincipals(department: Department): Promise<List<Principal>> {
    const modalRef = this._dialog.open(PrincipalAdd, {autoFocus: false, disableClose: true});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

}
