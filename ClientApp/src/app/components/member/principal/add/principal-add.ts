import {Component, Input} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {PrincipalHttpClient, PrincipalLoader, Department, User, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'principal-add.html'
})
export class PrincipalAdd {
  @Input()
  department: Department;

  users: User[] = [];

  constructor(private _httpClient: PrincipalHttpClient, private _loader: PrincipalLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<PrincipalAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async addAll() {
    const ids = this.users.map(user => user.id);
    const principals = await this._httpClient.addPrincipals(this.department, ids);

    for (const principal of principals) {
      await this._loader.load(principal);
    }

    this.department.principals.insertRange(principals, 0);
    this._alertEmitter.info(`${principals.size()} délégué(s) ont été ajouté(s).`);

    if (this._dialogRef) {
      this._dialogRef.close(principals);
    }
  }

}

