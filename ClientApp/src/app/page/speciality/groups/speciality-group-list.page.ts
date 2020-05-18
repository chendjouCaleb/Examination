import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {GroupAddComponent} from 'src/app/group';
import {Examination, Group, GroupHttpClient, GroupLoader, Speciality} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";


@Component({
  templateUrl: 'speciality-group-list.page.html',
  selector: 'group-list'
})
export class SpecialityGroupListPage{

  speciality: Speciality;

  constructor(private currentItems: CurrentItems, private _groupLoader: GroupLoader,
              private _httpClient: GroupHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {
    this.speciality = currentItems.get('speciality');
  }


}
