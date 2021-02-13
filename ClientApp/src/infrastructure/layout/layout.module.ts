import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MsfButtonModule, MsfCheckboxModule, MsfIconModule, MsfPersonaModule, MsfRadioModule} from 'fabric-docs';
import {PanelComponent} from './panel/panel.component';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarItemComponent} from './sidebar/sidebar-item';
import {SidebarCollapseDirective} from './sidebar/sidebar-collapse';
import {RouterModule} from '@angular/router';
import {LayoutSettingsComponent} from './settings/settings.component';
import {Theme} from '../preference/theme';
import {Labelled} from './labelled';
import {AuthPanelComponent} from './panel/auth-panel/auth-panel.component';
import {Breadcrumb} from './breadcrumb/breadcrumb';
import {MsPersonaModule} from '@ms-fluent/persona';
import {HammerModule} from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, RouterModule, MsfIconModule, MsfButtonModule, MsfRadioModule, MsfCheckboxModule,
    MsfPersonaModule, MsPersonaModule, HammerModule],
  declarations: [NavbarComponent, PanelComponent, LayoutComponent, SidebarComponent, AuthPanelComponent,
    SidebarItemComponent, SidebarCollapseDirective, LayoutSettingsComponent, Labelled, Breadcrumb],
  exports: [NavbarComponent,  PanelComponent, LayoutComponent, SidebarComponent, SidebarItemComponent,
    SidebarCollapseDirective, Labelled, Breadcrumb],
  providers: [ Theme ]
})
export class LayoutModule {
}
