import {Application, ApplicationHttpClient, ApplicationLoader} from 'examination/models';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {IApplicationLocation, IApplicationService} from './application.service.interface';
import {ApplicationEdit} from './edit/application-edit';
import {ApplicationDetails} from './details/application-details';
import {ApplicationAdd} from './add/application-add';


@Injectable({providedIn: 'root'})
export class ApplicationService implements IApplicationService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _loader: ApplicationLoader,
              private _httpClient: ApplicationHttpClient, private _alertEmitter: AlertEmitter) {
  }

  edit(application: Application): Promise<void> {
    const modal = this._dialog.open(ApplicationEdit, {disableClose: false});
    modal.componentInstance.application = application;

    return modal.afterClosed().toPromise();
  }


  delete(application: Application): Promise<boolean> {
    const result = this._confirmation.open('Voulez-vous Supprimer cette demande?');

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(application.id);
        application.level.applications?.remove(application);
        application.level.department?.applications?.remove(application);
        application.levelSpeciality?.applications?.remove(application);
        this._alertEmitter.info('La demande a été supprimée!');
        resolve(true);
      });
      result.reject.subscribe(() => resolve(false));
    });
  }

  details(application: Application) {
    const modal = this._dialog.open(ApplicationDetails, {minWidth: '750px'});
    modal.componentInstance.application = application;
  }

  reject(application: Application) {
    const result = this._confirmation.open(`Voulez-vous rejeter cette demande?`);

    return new Promise<void>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.reject(application);
        this._alertEmitter.info(`La demande a été rejetée.`);
        application.state = 'REJECTED';
        application.processDate = new Date();
      });

      resolve();
    })
  }

  accept(application: Application): Promise<void> {
    const result = this._confirmation.open(`Accepter cette demande?`);

    return new Promise<void>(resolve => {
      result.accept.subscribe(async () => {
        const app = await this._httpClient.accept(application);
        await this._loader.load(app);

        this._alertEmitter.info(`La demande a été acceptée et l'étudiant ajouté.`);
        application.state = app.state;
        application.processDate = app.processDate;
        application.student = app.student;
      });
      resolve();
    })
  }

  add(location: IApplicationLocation): Promise<Application> {
    const modalRef = this._dialog.open(ApplicationAdd, {autoFocus: false, disableClose: true});

    modalRef.componentInstance.school = location.school;
    modalRef.componentInstance.department = location.department;
    modalRef.componentInstance.level = location.level;
    modalRef.componentInstance.levelSpeciality = location.levelSpeciality;

    return modalRef.afterClosed().toPromise();
  }

}
