import {Secretary, SecretaryHttpClient, SecretaryLoader, Department} from 'examination/models';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {ISecretaryService} from './secretary.service.interface';
import {SecretaryAdd} from './add/secretary-add';
import {List} from '@positon/collections';


@Injectable({providedIn: 'root'})
export class SecretaryService implements ISecretaryService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _loader: SecretaryLoader,
              private _httpClient: SecretaryHttpClient, private _alertEmitter: AlertEmitter) {
  }


  deleteSecretary(secretary: Secretary): Promise<boolean> {
    const result = this._confirmation.open('Voulez-vous Supprimer ce sécrétaire?');

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(secretary.id);
        secretary.department.secretaries.remove(secretary);
        this._alertEmitter.info('Le secrétaire a été supprimé!');
        resolve(true);
      });

      result.reject.subscribe(() => resolve(false));
    });
  }


  addSecretaries(department: Department): Promise<List<Secretary>> {
    const modalRef = this._dialog.open(SecretaryAdd, {autoFocus: false, disableClose: true});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

}
