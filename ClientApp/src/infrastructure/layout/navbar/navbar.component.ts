import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {AuthorizationManager} from '../../../app/authorization/authorization-manager';

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
}
