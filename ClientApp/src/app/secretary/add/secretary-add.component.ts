import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import { SecretaryHttpClient, SecretaryLoader, Examination, User, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'secretary-add.component.html'
})
export class SecretaryAddComponent {
  @Input()
  examination: Examination;

  users: User[] = [];

  constructor(private _httpClient: SecretaryHttpClient, private _loader: SecretaryLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<SecretaryAddComponent>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const secretaries = await this._httpClient.addRange({}, {
      examinationId: this.examination.id,
      userId: ids
    });

    for (const secretary of secretaries) {
      await this._loader.load(secretary);
    }

    this._alertEmitter.info(`${secretaries.size()} sécretaire(s) ont été ajouté.`);
    this._dialogRef.close(secretaries);
  }

}

