import {Component, OnInit} from "@angular/core";
import {AuthenticationManager} from "examination/app/identity/authentication-manager";
import {Router} from "@angular/router";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'logout.page.html'
})
export class LogoutPage implements OnInit {

  constructor(private _authManager: AuthenticationManager,
              private _alert: AlertEmitter,
              private _router: Router) {
  }

  ngOnInit() {
  }

  async logout() {
    await this._authManager.logout();
    await this._router.navigateByUrl('/identity/login');
    this._alert.info('Vous êtes maintenant déconnecté !');
  }

  cancel() {
    if(history.length > 0) {
      history.back();
    }else {
      this._router.navigateByUrl('/').then();
    }
  }
}
