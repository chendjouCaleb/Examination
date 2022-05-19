import {Component, OnInit} from "@angular/core";
import {User} from "examination/entities";
import {AlertEmitter} from "src/controls";
import {ChangePasswordForm, IdentityManager} from "examination/app/identity";
import {AuthenticationManager} from "examination/app/identity/authentication-manager";
import {MsCheckboxChange} from "@ms-fluent/components";

@Component({
  templateUrl: 'UserChangePassword.page.html'
})
export class UserChangePasswordPage implements OnInit {
  user: User;
  form = new ChangePasswordForm();
  passwordVisible: boolean = false;

  constructor(private _alert: AlertEmitter, private identity: IdentityManager,
              private _auth: AuthenticationManager) {
  }


  async ngOnInit() {
    this.user = await this._auth.getUser();
  }

  toggleVisibility(event: MsCheckboxChange) {
    this.passwordVisible = event.checked;
  }


  async changePassword() {
    const model = this.form.getModel();

    await this.identity.changePassword(this.user, model);

    this._alert.info("Mot de passe mis à jour.");
  }

  get passwordType(): string {
    return this.passwordVisible ? 'text' : 'password';
  }
}
