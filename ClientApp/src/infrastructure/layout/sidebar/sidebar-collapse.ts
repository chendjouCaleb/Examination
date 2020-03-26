import {Directive, HostBinding, HostListener, Optional} from '@angular/core';
import {SidebarComponent} from './sidebar.component';

@Directive({
  selector: '[appSidebarCollapse]'
})
export class SidebarCollapseDirective {
  @HostBinding('class')
  className = 'app-sidebar-collapse-button';

  @HostListener('click')
  onClick() {
    this._sidebar.toggle();
  }

  constructor(@Optional() private _sidebar: SidebarComponent) {
    if (_sidebar == null) {
      throw new Error('The SidebarCollapse directive should be used inside a SidebarComponent');
    }
  }
}
