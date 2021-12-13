import {Directive, ViewChild} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {locales} from "./locales";
import {MENU_ICONS_VALUES} from "./ribbon-icons";

@Directive()
export class RibbonPageLayout  {

  @ViewChild(RouterOutlet)
  outlet: RouterOutlet;

  public locales = locales;

  public icons = MENU_ICONS_VALUES;

  public selectedLabel: string = '';
  public title: string = '';


  initView() {
    this.selectedLabel = this.outlet.activatedRouteData.label;
    this.title = locales[this.selectedLabel];

    this.outlet.activateEvents.subscribe(() => {
      this.selectedLabel = this.outlet.activatedRouteData.label;
      this.title = locales[this.selectedLabel];
    });
  }
}
