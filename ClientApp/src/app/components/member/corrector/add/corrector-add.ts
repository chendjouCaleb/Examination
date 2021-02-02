import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {CorrectorHttpClient, CorrectorLoader, Department, User, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'corrector-add.html'
})
export class CorrectorAdd{
  @Input()
  department: Department;

  users: User[] = [];

  constructor(private _httpClient: CorrectorHttpClient, private _loader: CorrectorLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<CorrectorAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const correctors = await this._httpClient.addCorrectors(this.department, ids);

    for (const corrector of correctors) {
      await this._loader.load(corrector);
    }

    this.department.correctors.addAll(correctors);
    this._alertEmitter.info(`${correctors.size()} correcteur(s) ont été ajoutés.`);

    if(this._dialogRef) {
      this._dialogRef.close(correctors);
    }
  }

}

