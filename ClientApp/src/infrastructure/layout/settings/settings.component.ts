import {Component, OnInit} from '@angular/core';
import {Theme} from '../../preference/theme';
import {Preference} from '../../preference/preference';

@Component({
  templateUrl: 'settings.component.html',
  selector: 'app-layout-settings',
  styleUrls: ['settings.component.scss']
})
export class LayoutSettingsComponent {
  _themeMode: string;
  _themeColor: string;
  _collapseSidebar: boolean;

  constructor(public theme: Theme, private preference: Preference) {
    preference.getObserver('themeMode').subscribe(mode => this._themeMode = mode);
    preference.getObserver('themeColor').subscribe(mode => this._themeColor = mode);
    preference.getObserver('collapseSidebar').subscribe(state => this._collapseSidebar = state);
  }


  getThemeColor(value: string) {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue(`--${value}Color`);
  }

  changeThemeMode(value: boolean) {
    const theme = value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    this.preference.set('themeMode', theme, true);
  }

  changeThemeColor(value: string) {
    document.documentElement.setAttribute('data-theme-color', value);
    this.preference.set('themeColor', value, true);
  }

  sidebarCollapseState(value: boolean) {
    this.preference.set('collapseSidebar', value, true);
  }
}
