import {Component, OnInit} from '@angular/core';
import {Supervisor, SupervisorHttpClient, SupervisorLoader, Examination} from 'src/models';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Confirmation} from 'src/controls/confirmation/confirmation';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {SupervisorAddComponent} from 'examination/app/supervisor';
import {MsfModal} from 'fabric-docs';

@Component({
  templateUrl: 'supervisor-list.page.html',
  selector: 'supervisor-list'
})
export class SupervisorListPage implements OnInit {

  examination: Examination;
  supervisors: List<Supervisor>;

  constructor(private currentItems: CurrentItems, private _supervisorLoader: SupervisorLoader,
              private _httpClient: SupervisorHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _modal: MsfModal) {
    this.examination = currentItems.get('examination');
  }

  async ngOnInit() {
    this.supervisors = await this._supervisorLoader.loadByExamination(this.examination);
  }

  openAddSupervisorModal() {
    const modalRef = this._modal.open(SupervisorAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.afterClosed().subscribe(result => {
      if(result) {
        this.supervisors.addAll(result);
      }
    });
  }


  delete(supervisor: Supervisor) {
    const result = this._confirmation.open('Voulez-vous Supprimer ce correcteur?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(supervisor.id);
      this.supervisors.remove(supervisor);
      this._alertEmitter.info('Le correcteur a été supprimé!');
    });
  }
}
