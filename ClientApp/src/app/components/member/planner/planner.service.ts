import {Planner, PlannerHttpClient, PlannerLoader, School} from 'examination/models';
import {Injectable} from '@angular/core';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {IPlannerService} from './planner.service.interface';
import {PlannerAdd} from './add/planner-add';
import {List} from '@positon/collections';
import {MsDialog} from '@ms-fluent/components';


@Injectable({providedIn: 'root'})
export class PlannerService implements IPlannerService {

  constructor(private _dialog: MsDialog,
              private _confirmation: Confirmation,
              private _loader: PlannerLoader,
              private _httpClient: PlannerHttpClient,
              private _alertEmitter: AlertEmitter) {
  }


  deletePlanner(planner: Planner): Promise<boolean> {
    const result = this._confirmation.open('Voulez-vous Supprimer ce planificateur?');

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(planner.id);
        planner.school.planners.remove(planner);
        this._alertEmitter.info('Le planificateur a été supprimé!');
        resolve(true);
      });
      result.reject.subscribe(() => resolve(false))
    });
  }


  addPlanners(school: School): Promise<List<Planner>> {
    const modalRef = this._dialog.open(PlannerAdd, {autoFocus: false, minWidth: '340px'});
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

}
