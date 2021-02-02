import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

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
export class TabLabel implements OnInit{
  @Input()
  icon: string;

  @Input()
  iconImage: string;

  @HostBinding('class.active')
  active: boolean = false;

  constructor(private router: Router, private _routerLink: RouterLink, private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.active = this.router.isActive(this._routerLink.urlTree, true);
  }

}
