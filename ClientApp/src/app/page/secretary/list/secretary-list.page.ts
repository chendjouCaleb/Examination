import {Component, OnInit} from '@angular/core';
import {Secretary, SecretaryHttpClient, SecretaryLoader, Examination} from 'src/models';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Confirmation} from 'src/controls/confirmation/confirmation';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {SecretaryAddComponent} from 'examination/app/secretary';
import {MsfModal} from 'fabric-docs';

@Component({
  templateUrl: 'secretary-list.page.html',
  selector: 'secretary-list'
})
export class SecretaryListPage implements OnInit {

  examination: Examination;
  secretaries: List<Secretary>;

  constructor(private currentItems: CurrentItems, private _secretaryLoader: SecretaryLoader,
              private _httpClient: SecretaryHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _modal: MsfModal) {
    this.examination = currentItems.get('examination');
  }

  async ngOnInit() {
    this.secretaries = await this._secretaryLoader.loadByExamination(this.examination);
  }

  openAddSecretaryModal() {
    const modalRef = this._modal.open(SecretaryAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.afterClosed().subscribe(result => {
      if(result) {
        this.secretaries.addAll(result);
      }
    });
  }


  delete(secretary: Secretary) {
    const result = this._confirmation.open('Voulez-vous Supprimer ce secretaire?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(secretary.id);
      this.secretaries.remove(secretary);
      this._alertEmitter.info('Le secretaire a été supprimé!');
    });
  }
}
