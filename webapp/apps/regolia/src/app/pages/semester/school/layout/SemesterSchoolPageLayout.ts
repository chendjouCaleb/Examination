import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Semester, Year} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {Title} from "@angular/platform-browser";
import {locales} from "@examination/locales";

@Component({
  templateUrl: 'SemesterSchoolPageLayout.html',
})
export class SemesterSchoolPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  semester: Semester;

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
    this.semester = currentItems.get('semester');
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.selectedLabel = this.outlet.activatedRouteData.label;
      this.title = locales[this.selectedLabel];
      this.browserTitle.setTitle(`Semestre ${this.semester.index + 1} • ${this.title}`);
    });
  }


  url(path: string): string {
    return this.year.url(path);
  }
}
