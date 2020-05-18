import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'MsfTab, [MsfTab], msf-tab, [msf-tab]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ 'tab.scss'],
  host: {
    class: 'msf-tab'
  }
})
export class Tab {

}
