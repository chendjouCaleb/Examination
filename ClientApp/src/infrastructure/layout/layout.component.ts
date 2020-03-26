import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef, HostBinding, Optional,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {PanelComponent} from './panel/panel.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {Preference} from '../preference/preference';

@Component({
  templateUrl: 'layout.component.html',
  selector: 'app-layout',
  styleUrls: ['layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements AfterContentInit {
  darkMode = false;

  @HostBinding('class')
  className = 'app-layout';

  @HostBinding('class.app-layout-withSidebar')
  get hasSidebar(): boolean {
    return !!this.sidebar;
  }

  @HostBinding('class.app-layout-withCollapsedSidebar')
  get collapsedSidebar(): boolean {
    if (!this.hasSidebar) {
      return false;
    }
    return this.sidebar.collapsed;
  }

  @ViewChildren(forwardRef(() => PanelComponent))
  panels: QueryList<PanelComponent>;

  @ViewChild('mainContent')
  mainContent: ElementRef<HTMLElement>;


  @ContentChild(SidebarComponent)
  sidebar: SidebarComponent;

  constructor(@Optional() private preference: Preference) {
    // if(preference) {
    //     preference.observers.get('backgroundImage').subscribe(bg => {
    //
    //     });
    // }
  }

  open(panelName: string) {
    const panel = this.panels.find(p => p.name === panelName);
    this.panels.forEach((p => p.isOpen ? p.close() : ''));
    panel.toggle();
  }


  ngAfterContentInit(): void {
    if (this.sidebar) {
      this.sidebar.element.classList.add('layout-sidebar');
    }

    if (this.sidebar && this.preference) {
      this.sidebar.collapsed = this.preference.get('collapseSidebar');

      this.preference.observers.get('collapseSidebar').subscribe(value => this.sidebar.collapsed = value);
    }

    this.preference.observers.get('themeMode').subscribe(mode => {
      document.documentElement.setAttribute('data-theme', mode);
    });

    this.preference.observers.get('themeColor').subscribe(color => {
      document.documentElement.setAttribute('data-theme-color', color);
    });
  }
}
