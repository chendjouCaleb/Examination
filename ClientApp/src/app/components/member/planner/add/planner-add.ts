import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {PlannerHttpClient, PlannerLoader, School, User, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'planner-add.html'
})
export class PlannerAdd {
  @Input()
  school: School;

  users: User[] = [];

  constructor(private _httpClient: PlannerHttpClient, private _loader: PlannerLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<PlannerAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const planners = await this._httpClient.addPlanners(this.school, ids);

    for (const planner of planners) {
      await this._loader.load(planner);
      planner.school = this.school;
    }

    this.school.planners.insertRange(planners, 0);
    this._alertEmitter.info(`${planners.size()} planificateurs(s) ont été ajouté(s).`);

    if (this._dialogRef) {
      this._dialogRef.close(planners);
    }
  }

}

