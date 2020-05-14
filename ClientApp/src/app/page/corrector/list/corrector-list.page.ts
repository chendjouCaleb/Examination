import {Component, OnInit} from '@angular/core';
import {Corrector, CorrectorHttpClient, CorrectorLoader, Examination} from 'src/models';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Confirmation} from 'src/controls/confirmation/confirmation';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {CorrectorAddComponent} from 'examination/app/corrector';
import {MsfModal} from 'fabric-docs';

@Component({
  templateUrl: 'corrector-list.page.html',
  selector: 'corrector-list'
})
export class CorrectorListPage implements OnInit {

  examination: Examination;
  correctors: List<Corrector>;

  constructor(private currentItems: CurrentItems, private _correctorLoader: CorrectorLoader,
              private _httpClient: CorrectorHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _modal: MsfModal) {
    this.examination = currentItems.get('examination');
  }

  async ngOnInit() {
    this.correctors = await this._correctorLoader.loadByExamination(this.examination);
  }

  openAddCorrectorModal() {
    const modalRef = this._modal.open(CorrectorAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.afterClosed().subscribe(result => {
      if(result) {
        this.correctors.addAll(result);
      }
    });
  }


  delete(corrector: Corrector) {
    const result = this._confirmation.open('Voulez-vous Supprimer ce correcteur?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(corrector.id);
      this.correctors.remove(corrector);
      this._alertEmitter.info('Le correcteur a été supprimé!');
    });
  }
}
