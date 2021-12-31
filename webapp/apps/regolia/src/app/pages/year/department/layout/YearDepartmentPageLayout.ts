import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Year, YearDepartment} from 'examination/entities';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {Title} from "@angular/platform-browser";
import {locales, MENU_ICONS_VALUES} from "@examination/infrastructure";

@Component({
  templateUrl: 'YearDepartmentPageLayout.html',
})
export class YearDepartmentPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  yearDepartment: YearDepartment;


  @ViewChild(RouterOutlet)
  outlet: RouterOutlet;

  locales = locales;

  icons = MENU_ICONS_VALUES;

  selectedLabel: string = '';
  title: string;

  constructor(public _router: Router, currentItems: CurrentItems,
              private browserTitle: Title,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
    this.year = currentItems.get('year');
    this.yearDepartment = currentItems.get('yearDepartment');
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.selectedLabel = this.outlet.activatedRouteData.label;
      this.title = locales[this.selectedLabel];
      this.browserTitle.setTitle(`${this.year.rangeYears()} • ${this.yearDepartment.department.name} • ${this.title}`);
    });


  }


  url(path: string): string {
    return this.yearDepartment.url(path);
  }
}
