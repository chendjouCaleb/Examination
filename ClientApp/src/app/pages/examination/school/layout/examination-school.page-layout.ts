import {Component, Input, OnInit} from '@angular/core';
import {Examination} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'examination-school.page-layout.html',
  selector: 'app-examination-school-page-layout'
})
export class ExaminationSchoolPageLayout implements OnInit {
  @Input()
  examination: Examination;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.examination = _items.get('examination');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'Schools', url: '/schools'},
      {name: this.examination.school.name, url: `${this.examination.school.url}`},
      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    } else {
      this._title.setTitle(this.examination.name);
    }
  }
}
