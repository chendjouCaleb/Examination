import {Component, EventEmitter, HostBinding, Output} from '@angular/core';

@Component({
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  selector: 'app-navbar'

})
export class NavbarComponent {
  constructor( ) { }

  @HostBinding('class')
  depthClassName = 'ms-depth-0';
  activeSearchBar = false;

  @Output()
  buttonClick = new EventEmitter<string>();
}
