import {Component, HostBinding, Input } from '@angular/core';

@Component({
  templateUrl: 'sidebar-item.html',
  selector: 'app-sidebar-item, [app-sidebar-item]'
})
export class SidebarItemComponent {

  @HostBinding('class')
  className = 'app-sidebar-item';

  @Input()
  icon: string;

  @Input()
  iconImage: string;
}
