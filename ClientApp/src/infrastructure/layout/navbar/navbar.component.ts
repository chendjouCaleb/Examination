import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {AuthorizationManager} from 'examination/app/authorization/authorization-manager';
import {User} from 'examination/entities/identity';

@Component({
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  selector: 'app-navbar'

})
export class NavbarComponent {

  @HostBinding('class')
  depthClassName = 'ms-depth-0';
  activeSearchBar = false;

  @Output()
  buttonClick = new EventEmitter<string>();

  constructor(public authManager: AuthorizationManager) {
  }

  get user(): User {
    return this.authManager.user;
  }
}
