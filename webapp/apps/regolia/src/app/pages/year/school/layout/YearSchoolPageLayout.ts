﻿import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Year} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {Title} from "@angular/platform-browser";
import {locales} from "../../../../../infrastructure/locales";

@Component({
  templateUrl: 'YearSchoolPageLayout.html',
})
export class YearSchoolPageLayout implements AfterViewInit {
  school: School;
  year: Year;

  @ViewChild(RouterLink)
  private activeLink : RouterLink;

  @ViewChild(RouterOutlet)
  outlet: RouterOutlet;

  selectedLabel: string = '';
  title: string = '';

  constructor(public _router: Router, currentItems: CurrentItems,
              private browserTitle: Title,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
    this.year = currentItems.get('year');
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.selectedLabel = this.outlet.activatedRouteData.label;
      this.title = locales[this.selectedLabel];
      this.browserTitle.setTitle(this.year.rangeYears() + ' • ' + this.title);
    });
  }


  url(path: string): string {
    return this.year.url(path);
  }
}
