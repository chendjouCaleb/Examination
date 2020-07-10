import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Principal, PrincipalHttpClient, PrincipalLoader, UserHttpClient} from '../../../models';
import {PrincipalEditForm} from '../form';
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'principal-edit.component.html'
})
export class PrincipalEditComponent implements OnInit {
  form: PrincipalEditForm;

  @Input()
  principal: Principal;

  constructor(private _httpClient: PrincipalHttpClient,
              private _loader: PrincipalLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<PrincipalEditComponent>,
              private _alertEmitter: AlertEmitter) {
  }


  ngOnInit(): void {
    this.form = new PrincipalEditForm(this.principal);
  }

  async edit() {
    await this._httpClient.updateAsync(this.principal.id, this.form.getModel());
    this.principal.role = this.form.getModel().role;
    this._alertEmitter.info(`L'principalistrateur a été modifié.`);
    this._dialogRef.close();
  }


}
