import {Component, OnInit} from "@angular/core";
import {User} from "examination/entities";
import {ChangePasswordForm, IdentityManager} from "examination/app/identity";
import {AlertEmitter} from "src/controls";
import {AuthenticationManager} from "examination/app/identity/authentication-manager";
import {ChangeUserInfoForm} from "examination/app/identity/forms/change-user-info.form";

@Component({
  templateUrl: 'settings-profile.page.html'
})
export class SettingsProfilePage implements OnInit {
  user: User;
  form: ChangeUserInfoForm;

  constructor(private _alert: AlertEmitter, private identity: IdentityManager,
              private _auth: AuthenticationManager) {
  }

  async ngOnInit() {
    this.user = await this._auth.getUser();
    this.form = new ChangeUserInfoForm(this.user);
  }

  async changeInfo() {
    const model = this.form.getModel();
    await this.identity.changeInfo(this.user, model);

    this.user.firstName = model.firstName;
    this.user.lastName = model.lastName;
    this.user.birthDate = model.birthDate;
    this.user.gender = model.gender;

    this._alert.success("Vos informations ont été mises à jour.")
  }
}
