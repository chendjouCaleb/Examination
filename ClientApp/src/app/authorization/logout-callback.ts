import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthorizationManager} from "./authorization-manager";

@Component({
  template: 'Déconnexion....',
})
export class LogoutCallback implements OnInit {
  private redirectUrl: string = '/';
  constructor(private router: Router,
              private identity: AuthorizationManager) {

  }

  ngOnInit(): void {
    this.identity.removeAuthorizationTokens();
    this.router.navigateByUrl(this.redirectUrl).then();
  }
}
