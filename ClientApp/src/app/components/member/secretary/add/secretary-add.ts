import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {SecretaryHttpClient, SecretaryLoader, Department, User, UserHttpClient} from 'examination/models';
import {MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'secretary-add.html'
})
export class SecretaryAdd {
  @Input()
  department: Department;

  users: User[] = [];

  constructor(private _httpClient: SecretaryHttpClient, private _loader: SecretaryLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsDialogRef<SecretaryAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const secretaries = await this._httpClient.addSecretaries(this.department, ids);

    for (const secretary of secretaries) {
      await this._loader.load(secretary);
    }

    this.department.secretaries.insertRange(secretaries, 0);
    this._alertEmitter.info(`${secretaries.size()} sécrétaires(s) ont été ajouté(s).`);

    if (this._dialogRef) {
      this._dialogRef.close(secretaries);
    }
  }

}

