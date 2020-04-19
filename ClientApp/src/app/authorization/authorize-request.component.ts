import {Component} from '@angular/core';
import {AuthorizationManager} from './authorization-manager';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'authorize-request.component.html'
})
export class AuthorizeRequestComponent {
  returnUrl: string;

  constructor(private _authManager: AuthorizationManager, private route: ActivatedRoute) {
    this.returnUrl = route.snapshot.queryParams.returnUrl;
  }

  navigateToAuthorize() {
    this._authManager.authorize(this.returnUrl);
  }
}
