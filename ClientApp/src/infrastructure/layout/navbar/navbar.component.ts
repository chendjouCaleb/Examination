import {Component, ElementRef, EventEmitter, HostBinding, Output} from '@angular/core';
import {AuthorizationManager} from 'examination/app/authorization/authorization-manager';
import {User} from 'examination/entities/identity';
import {Global} from '../../../global';

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

  constructor(public authManager: AuthorizationManager,
              private _elementRef: ElementRef<HTMLElement>,
              public global: Global) {
  }

  get user(): User {
    return this.authManager.user;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
