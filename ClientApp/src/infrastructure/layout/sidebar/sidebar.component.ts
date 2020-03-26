/* tslint:disable:variable-name */
import {Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: 'sidebar.component.html',
  selector: 'app-sidebar, [app-sidebar]',
  styleUrls: ['sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  @HostBinding('class')
  className = 'app-sidebar';


  private _collapsed = false;

  @Output()
  collapseStateChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  @Input()
  @HostBinding('class.app-sidebar-collapse')
  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(value: boolean) {
    if (value === this._collapsed) {
      return;
    }
    this._collapsed = value;

    this.collapseStateChange.emit(value);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
