import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'MsfTabLabel, [MsfTabLabel], msf-tab-label, [msf-tab-label]',
  templateUrl: 'tab-label.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'msf-tab-label',
    '[attr.tabindex]': '0',
     routerLinkActive: 'active'
  },

})
export class TabLabel {
  @Input()
  icon: string;

  @Input()
  iconImage: string;
}
