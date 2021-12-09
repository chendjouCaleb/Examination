import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Semester, SemesterDepartment, Year} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {locales, MENU_ICONS_VALUES} from "../../../../../infrastructure";
import {Title} from "@angular/platform-browser";

@Component({
  templateUrl: 'SemesterDepartmentPageLayout.html',
})
export class SemesterDepartmentPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  semester: Semester;
  semesterDepartment: SemesterDepartment;

  @ViewChild(RouterOutlet)
  outlet: RouterOutlet;

  locales = locales;

  icons = MENU_ICONS_VALUES;

  selectedLabel: string = '';
  title: string = '';

  constructor(public _router: Router, currentItems: CurrentItems,
              private browserTitle: Title,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
    this.semester = currentItems.get('semester');
    this.year = this.semester.year;
    this.semesterDepartment = currentItems.get('semesterDepartment')
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.selectedLabel = this.outlet.activatedRouteData.label;
      this.title = locales[this.selectedLabel];
      this.browserTitle.setTitle(`Semestre ${this.semester.index + 1} • ${this.title}`);
    });
  }


  url(path: string): string {
    return this.semesterDepartment.url(path);
  }
}
