import {Component, OnInit} from '@angular/core';
import {AuthorizationManager} from './authorization-manager';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: 'authorize-callback.component.html'
})
export class AuthorizeCallbackComponent implements OnInit{
  returnUrl: string;

  constructor(private _authManager: AuthorizationManager, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    console.log("callback")
    this.authorizeCallback();
  }

  async authorizeCallback() {
    const returnUrl = this.route.snapshot.queryParams['redirectUrl'];

    const auth_code = this.route.snapshot.queryParams['auth_code'];

    await this._authManager.authorize(auth_code);

    if(returnUrl) {
      this.router.navigateByUrl(returnUrl);
    }else {
      this.router.navigateByUrl('/');
    }

  }
}
