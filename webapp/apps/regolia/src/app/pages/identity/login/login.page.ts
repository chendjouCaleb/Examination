import {Component} from "@angular/core";
import {LoginForm} from "examination/app/identity";
import {AuthenticationManager} from "examination/app/identity/authentication-manager";
import {Router} from "@angular/router";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'login.page.html'
})
export class LoginPage {
  form = new LoginForm();
  passwordVisible: boolean

  get passwordType(): string {
    return this.passwordVisible ? 'text' : 'password';
  }

  constructor(private _authManager: AuthenticationManager, private _router: Router, private _alert: AlertEmitter) {
  }


  async login() {
    if(this.form.invalid) {
      return;
    }

    const model = this.form.getModel();
    console.log(model);

    await this._authManager.login(model);
    this._alert.info(`${this._authManager.user.fullName} est maintenant connecté.`);
    await this._router.navigateByUrl('/')
  }
}
