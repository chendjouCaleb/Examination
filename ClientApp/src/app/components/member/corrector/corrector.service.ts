import {Corrector, CorrectorHttpClient, CorrectorLoader, Department} from 'examination/models';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {ICorrectorService} from './corrector.service.interface';
import {CorrectorAdd} from './add/corrector-add';
import {List} from '@positon/collections';


@Injectable({providedIn: 'root'})
export class CorrectorService implements ICorrectorService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _loader: CorrectorLoader,
              private _httpClient: CorrectorHttpClient, private _alertEmitter: AlertEmitter) {
  }


  deleteCorrector(corrector: Corrector): Promise<void> {
    const result = this._confirmation.open('Voulez-vous Supprimer ce correcteur?');

    return new Promise<void>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(corrector.id);
        corrector.department.correctors.remove(corrector);
        this._alertEmitter.info('La correcteur a été supprimée!');
      });
      resolve();
    });
  }


  addCorrectors(department: Department): Promise<List<Corrector>> {
    const modalRef = this._dialog.open(CorrectorAdd, {autoFocus: false, disableClose: true});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

}
