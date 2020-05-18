import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {GroupAddComponent} from 'src/app/group';
import {Examination, Group, GroupHttpClient, GroupLoader} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";


@Component({
  templateUrl: 'group-list.page.html',
  selector: 'group-list'
})
export class GroupListPage implements OnInit {

  examination: Examination;
  specialities: List<Group>;

  constructor(private currentItems: CurrentItems, private _groupLoader: GroupLoader,
              private _httpClient: GroupHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {
    this.examination = currentItems.get('examination');
  }

  async ngOnInit() {
    this.specialities = await this._groupLoader.loadByExamination(this.examination);
  }

  openAddGroupDialog() {
    const modalRef = this._dialog.open(GroupAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialities.insert(0, result);
      }
    });
  }


  delete(group: Group) {
    const result = this._confirmation.open('Voulez-vous Supprimer cette spécialité?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(group.id);
      this.specialities.remove(group);
      this._alertEmitter.info('La spécialité a été supprimée!');
    });
  }
}
