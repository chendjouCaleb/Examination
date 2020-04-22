import {Component, Inject, Input} from "@angular/core";
import {AdminAddForm} from "../form";
import {AlertEmitter} from "src/controls/alert-emitter";
import {AdminHttpClient, AdminLoader, Organisation, UserHttpClient} from "../../../../models";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  templateUrl: 'admin-add.component.html'
})
export class AdminAddComponent {
  form = new AdminAddForm();
  userId: string;

  @Input()
  organisation: Organisation;

  constructor(private _httpClient: AdminHttpClient, private _loader: AdminLoader,
              private _userHttpClient: UserHttpClient,
              @Inject(MAT_DIALOG_DATA) dialogData: any,
              private _dialogRef: MatDialogRef<AdminAddComponent>,
              private _alertEmitter: AlertEmitter) {
    this.organisation = dialogData.organisation;
  }

  async checkEmail() {
    const email = this.form.getControl("email");
    if (email.value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
      const user = await this._userHttpClient.findByEmail(email.value);
      if (!user || !user.id) {
        email.addError("Aucun utilisateur n'utilise cet addresse email");
      }else {
        this.userId = user.id;
      }
    }
  }


  async add() {
    const model: IAddAdminModel = {role: this.form.getModel().role, userId: this.userId};
    let admin = await this._httpClient.add(model, {organisationId: this.organisation.id});
    await this._loader.load(admin);
    this._alertEmitter.info(`L'administrateur ${admin.user.fullName} a été ajouté.`);
    this._dialogRef.close(admin);
  }
}

interface IAddAdminModel {
  userId: string;
  role: string;
}
