import {Component} from "@angular/core";
import {RegisterForm} from "examination/app/identity/forms/register.form";
import {IdentityManager} from "examination/app/identity";
import {Router} from "@angular/router";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'register.page.html'
})
export class RegisterPage {
  form = new RegisterForm();
  passwordVisible: boolean

  constructor(private _identity: IdentityManager,
              private _router: Router,
              private _alert: AlertEmitter) {
  }

  get passwordType(): string {
    return this.passwordVisible ? 'text' : 'password';
  }


  async register() {
    if(this.form.invalid) {
      this._alert.error("Formulaire invalide !");
      console.log(this.form.getModel())
    }

    try {
      const user = await this._identity.createUser(this.form.getModel());
      this._router.navigateByUrl('/').then();
      this._alert.success(`Le compte de ${user.fullName} a été crée !`);
    }catch (e) {
      this._alert.error(e.error?.message);
    }

  }
}
