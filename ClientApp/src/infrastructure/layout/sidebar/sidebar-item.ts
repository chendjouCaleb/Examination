import {AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild} from '@angular/core';

@Component({
  templateUrl: 'sidebar-item.html',
  selector: 'app-sidebar-item, [app-sidebar-item]'
})
export class SidebarItemComponent implements AfterViewInit{

  @HostBinding('class')
  className = 'app-sidebar-item';

  @Input()
  icon: string;

  @Input()
  iconImage: string;

  @ViewChild('label')
  _labelElement: ElementRef<HTMLElement>;

  constructor(private _elementRef: ElementRef<HTMLElement>) {}



  ngAfterViewInit(): void {
    this._elementRef.nativeElement.setAttribute('title', this._labelElement.nativeElement.textContent);
  }
}
