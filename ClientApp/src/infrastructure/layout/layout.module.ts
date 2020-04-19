import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MsfCheckboxModule, MsfIconModule,  MsfPersonaModule, MsfRadioModule} from 'fabric-docs';
import {PanelComponent} from './panel/panel.component';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarItemComponent} from './sidebar/sidebar-item';
import {SidebarCollapseDirective} from './sidebar/sidebar-collapse';
import {RouterModule} from '@angular/router';
import {LayoutSettingsComponent} from './settings/settings.component';
import {Theme} from '../preference/theme';
import {Labelled} from './labelled';

@NgModule({
  imports: [CommonModule, RouterModule, MsfIconModule, MsfRadioModule, MsfCheckboxModule, MsfPersonaModule],
  declarations: [NavbarComponent, PanelComponent, LayoutComponent, SidebarComponent,
    SidebarItemComponent, SidebarCollapseDirective, LayoutSettingsComponent, Labelled],
  exports: [NavbarComponent,  PanelComponent, LayoutComponent, SidebarComponent, SidebarItemComponent,
    SidebarCollapseDirective, Labelled],
  providers: [ Theme ]
})
export class LayoutModule {
}
