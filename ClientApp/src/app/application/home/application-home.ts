
import {Component, Input} from '@angular/core';
import {Application, ApplicationHttpClient} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {ApplicationService} from "../application.service";

@Component({
  templateUrl: 'application-home.html',
  selector: 'app-application'
})
export class ApplicationHome {
  @Input()
  application: Application;

  @Input()
  applications = new List();

  constructor(public _applicationService: ApplicationService,
              private _confirmation: Confirmation,
              private _httpClient: ApplicationHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modalRef: MsfModalRef<ApplicationHome>) {}

  delete( ) {
    const result = this._confirmation.open('Voulez-vous Supprimer cette demande?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(this.application.id);
      this.applications.remove(this.application);
      this._alertEmitter.info('La demande a été suppriméé!');
      this._modalRef.close();
    });
  }
}
