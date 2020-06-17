import {Component, Input} from '@angular/core';
import {PrincipalAddForm} from '../form';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Examination, PrincipalHttpClient, PrincipalLoader, UserHttpClient} from 'examination/models';
import {MsfModalRef} from 'fabric-docs';


@Component({
  templateUrl: 'principal-add.component.html'
})
export class PrincipalAddComponent {
  form = new PrincipalAddForm();

  @Input()
  examination: Examination;

  constructor(private _httpClient: PrincipalHttpClient, private _loader: PrincipalLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MsfModalRef<PrincipalAddComponent>,
              private _alertEmitter: AlertEmitter) {
  }

  async add() {
    const formModel = this.form.getModel();
    const model: IAddPrincipalModel = {role: formModel.role, userId: formModel.user.id};
    const principal = await this._httpClient.add(model, {
      examinationId: this.examination.id,
      userId: formModel.user.id
    });
    await this._loader.load(principal);
    this.examination.principalCount++;
    this._alertEmitter.info(`Le délégué ${principal.user.fullName} a été ajouté.`);
    this._dialogRef.close(principal);
  }
}

interface IAddPrincipalModel {
  userId?: string;
  role: string;
}
