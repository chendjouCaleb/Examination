import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {CorrectorHttpClient, CorrectorLoader, Examination, User, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'corrector-add.component.html'
})
export class CorrectorAddComponent {
  @Input()
  examination: Examination;

  users: User[] = [];

  constructor(private _httpClient: CorrectorHttpClient, private _loader: CorrectorLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<CorrectorAddComponent>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const correctors = await this._httpClient.addRange({}, {
      examinationId: this.examination.id,
      userId: ids
    });

    for (const corrector of correctors) {
      await this._loader.load(corrector);
    }

    this._alertEmitter.info(`${correctors.size()} correcteur(s) ont été ajouté.`);
    this._dialogRef.close(correctors);
  }

}

