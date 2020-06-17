import {Component, Inject, Input} from '@angular/core';
import {Application, ApplicationHttpClient} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from "../application.service.interface";

@Component({
  templateUrl: 'application-home.html',
  selector: 'app-application'
})
export class ApplicationHome {
  @Input()
  application: Application;

  @Input()
  applications = new List();

  constructor(@Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public _applicationService: IApplicationService,
              private _confirmation: Confirmation,
              private _httpClient: ApplicationHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modalRef: MsfModalRef<ApplicationHome>) {
  }

  delete() {
    const result = this._confirmation.open('Voulez-vous Supprimer cette demande?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(this.application.id);
      this.applications.remove(this.application);
      this._alertEmitter.info('La demande a été suppriméé!');
      this._modalRef.close();
    });
  }
}
