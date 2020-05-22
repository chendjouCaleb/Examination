import {Application, ApplicationHttpClient, ApplicationLoader} from "examination/models";
import {ApplicationEditComponent} from "examination/app/application/edit/application-edit.component";
import {ApplicationSpeciality} from "examination/app/application/speciality/application-speciality";
import {Injectable} from "@angular/core";
import {MsfModal} from "fabric-docs";
import {AlertEmitter, Confirmation} from "examination/controls";
import {ApplicationHome} from "examination/app/application/home/application-home";

@Injectable({providedIn: 'root'})
export class ApplicationService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _loader: ApplicationLoader,
              private _httpClient: ApplicationHttpClient, private _alertEmitter: AlertEmitter) {
  }

  edit(application: Application) {
    const modal = this._dialog.open(ApplicationEditComponent, {disableClose: false});
    modal.componentInstance.application = application;
  }


  removeSpeciality(application: Application) {
    const result = this._confirmation
      .open(`Voulez-vous enlever la spécialité de votre demande?`);
    result.accept.subscribe(async () => {
      await this._httpClient.removeSpeciality(application);
      this._alertEmitter.info(`La specialité a été enlevé de votre demande.`);
      application.speciality = null;
      application.specialityId = null;
    });
  }

  changeSpeciality(application: Application) {
    const modal = this._dialog.open(ApplicationSpeciality, {disableClose: true});
    modal.componentInstance.application = application;
  }

  details(application: Application) {
    const modal = this._dialog.open(ApplicationHome, {minWidth: '750px'});
    modal.componentInstance.application = application;
  }

  reject(application: Application) {
    const result = this._confirmation
      .open(`Voulez-vous rejeter cette demande?`);
    result.accept.subscribe(async () => {
      await this._httpClient.reject(application);
      this._alertEmitter.info(`La demande a été rejetée.`);
      application.state = 'REJECTED';
      application.processDate = new Date();
    });
  }

  accept(application: Application) {
    const result = this._confirmation
      .open(`Accepter cette demande?`);
    result.accept.subscribe(async () => {
      const app = await this._httpClient.accept(application);
      await this._loader.load(app);

      this._alertEmitter.info(`La demande a été acceptée et l'étudiant ajouté.`);
      application.state = app.state;
      application.processDate = app.processDate;
      application.student = app.student;
    });
  }

}
