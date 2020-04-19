import {Component} from '@angular/core';
import {AuthorizationManager} from './authorization-manager';
import {ActivatedRoute, Router} from '@angular/router';
import {ITokenModel} from './models/token-model';

@Component({
  templateUrl: 'authorize-callback.component.html'
})
export class AuthorizeCallbackComponent {
  returnUrl: string;

  constructor(private _authManager: AuthorizationManager, private route: ActivatedRoute, private router: Router) {

  }

  async authorizeCallback() {
    const returnUrl = this.route.snapshot.queryParams['redirectUrl'];

    const token: ITokenModel = {
      accessToken: this.route.snapshot.queryParams['accessToken'],
      refreshToken: this.route.snapshot.queryParams['refreshToken']
    };

    await this._authManager.refreshAuthorizationToken(token);
    await this.router.navigateByUrl(returnUrl);
  }
}
