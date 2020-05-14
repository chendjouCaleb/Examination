import {Component, Inject, Input} from '@angular/core';
import {PrincipalAddForm} from '../form';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Examination, PrincipalHttpClient, PrincipalLoader, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'principal-add.component.html'
})
export class PrincipalAddComponent {
  form = new PrincipalAddForm();
  userId: string;

  @Input()
  examination: Examination;

  constructor(private _httpClient: PrincipalHttpClient, private _loader: PrincipalLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<PrincipalAddComponent>,
              private _alertEmitter: AlertEmitter) { }

  async add() {
    const model: IAddPrincipalModel = {role: this.form.getModel().role, userId: this.userId};
    const principal = await this._httpClient.add(model, {examinationId: this.examination.id});
    await this._loader.load(principal);
    this._alertEmitter.info(`Le délégué ${principal.user.fullName} a été ajouté.`);
    this._dialogRef.close(principal);
  }
}

interface IAddPrincipalModel {
  userId: string;
  role: string;
}
