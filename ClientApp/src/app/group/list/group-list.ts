import {Component, Input, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Examination, Group, GroupHttpClient, GroupLoader, Speciality} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";
import { GroupAddComponent } from '../add/group-add.component';


@Component({
  templateUrl: 'group-list.html',
  selector: 'app-group-list'
})
export class GroupList implements OnInit {

  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  groups: List<Group>;

  constructor(private currentItems: CurrentItems, private _groupLoader: GroupLoader,
              private _httpClient: GroupHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {

  }

  async ngOnInit() {
    let groups: List<Group>;
    if(this.examination) {
      groups = await this._httpClient.listByExamination(this.examination);
    }else if(this.speciality){
      groups = await this._httpClient.listBySpeciality(this.speciality);
    }
    await this._groupLoader.loadAll(groups);
    this.groups = groups;

  }

  openAddGroupDialog() {
    const modalRef = this._dialog.open(GroupAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.componentInstance.speciality = this.speciality;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.groups.insert(0, result);
      }
    });
  }


  delete(group: Group) {
    const result = this._confirmation.open('Voulez-vous Supprimer ce groupe?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(group.id);
      this.groups.remove(group);
      this._alertEmitter.info('Le groupe a été supprimé!');
    });
  }
}
