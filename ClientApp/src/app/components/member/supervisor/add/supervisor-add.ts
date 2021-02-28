import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {SupervisorHttpClient, SupervisorLoader, Department, User, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'supervisor-add.html'
})
export class SupervisorAdd {
  @Input()
  department: Department;

  users: User[] = [];

  constructor(private _httpClient: SupervisorHttpClient, private _loader: SupervisorLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<SupervisorAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const supervisors = await this._httpClient.addSupervisors(this.department, ids);

    for (const supervisor of supervisors) {
      await this._loader.load(supervisor);
    }

    this.department.supervisors.insertRange(supervisors, 0);
    this._alertEmitter.info(`${supervisors.size()} superviseur(s) ont été ajouté(s).`);

    if (this._dialogRef) {
      this._dialogRef.close(supervisors);
    }
  }

}

