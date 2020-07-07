import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationManager} from 'src/app/authorization/authorization-manager';
import { User } from 'src/models/entities';


@Component({
  templateUrl: 'auth-panel.component.html',
  selector: 'app-auth-panel'
})
export class AuthPanelComponent implements OnInit {
  user: User;
  isAuth: boolean;

  constructor(public identity: AuthorizationManager, private router: Router) {
    this.user = this.identity.user;
  }

  ngOnInit(): void {
    this.isAuth = this.identity.isAuthorized;

    if (this.isAuth) {
      this.user = this.identity.user;
    }

  }
}
