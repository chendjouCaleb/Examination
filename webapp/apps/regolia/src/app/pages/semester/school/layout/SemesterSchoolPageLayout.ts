import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Semester, Year} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {Title} from "@angular/platform-browser";
import {locales} from "@examination/locales";
import {MENU_ICONS_VALUES, RibbonPageLayout} from "../../../../../infrastructure";

@Component({
  templateUrl: 'SemesterSchoolPageLayout.html',
})
export class SemesterSchoolPageLayout extends RibbonPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  semester: Semester;
  title: string = '';

  constructor(public _router: Router, currentItems: CurrentItems,
              private browserTitle: Title,
              @Optional() private route: ActivatedRoute) {
    super();
    this.school = currentItems.get('school');
    this.year = currentItems.get('year');
    this.semester = currentItems.get('semester');
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.initView();
      this.browserTitle.setTitle(`Semestre ${this.semester.index + 1} • ${this.title}`);
    });
  }


  url(path: string): string {
    return this.semester.url(path);
  }
}
