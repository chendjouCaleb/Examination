import {Component} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Examination, Application, ApplicationHttpClient, ApplicationLoader} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";


@Component({
  templateUrl: 'application-list.page.html',
  selector: 'application-list'
})
export class ApplicationListPage {

  examination: Examination;
  specialities: List<Application>;

  constructor(private currentItems: CurrentItems,
              private _applicationLoader: ApplicationLoader,
              private _httpClient: ApplicationHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {
    this.examination = currentItems.get('examination');
  }

}
