import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, User, Year} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {locales, RibbonPageLayout} from "examination/infrastructure";
import {CurrentItems} from "examination/app/current-items";
import {IdentityManager} from "examination/app/identity";
import {AuthenticationManager} from "examination/app/identity/authentication-manager";

@Component({
  templateUrl: 'UserSettingsPageLayout.html',
})
export class UserSettingsPageLayout extends RibbonPageLayout implements AfterViewInit {
  user: User;

  @ViewChild(RouterOutlet)
  outlet: RouterOutlet;

  selectedLabel: string = 'profile';
  title: string = '';

  constructor(public _router: Router, currentItems: CurrentItems,
              private browserTitle: Title,
              private identity: AuthenticationManager,
              @Optional() private route: ActivatedRoute) {
    super();
  }

  async ngAfterViewInit() {
    this.user = await this.identity.getUser();
    Promise.resolve().then(() => {
      this.selectedLabel = this.outlet.activatedRouteData.label;
      this.title = locales[this.selectedLabel];
      this.browserTitle.setTitle('Paramètres' + ' • ' + this.title);
    });
  }


  url(path: string): string {
    return `/settings/${path}`;
  }
}
