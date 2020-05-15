import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Examination, SupervisorHttpClient, User, UserHttpClient, SupervisorLoader} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'supervisor-add.component.html'
})
export class SupervisorAddComponent {
  @Input()
  examination: Examination;

  users: User[] = [];

  constructor(private _httpClient: SupervisorHttpClient, private _loader: SupervisorLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<SupervisorAddComponent>,
              private _alertEmitter: AlertEmitter) {
  }
  async addAll() {
    const ids = this.users.map(user => user.id);
    const supervisors = await this._httpClient.addRange({}, {
      examinationId: this.examination.id,
      userId: ids
    });

    for (const supervisor of  supervisors) {
      await this._loader.load(supervisor);
    }

    this._alertEmitter.info(`${supervisors.size()} correcteur(s) ont été ajouté.`);
    this._dialogRef.close(supervisors);
  }

}

