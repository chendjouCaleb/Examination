import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment, ExaminationLevel, Test} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'test.page-layout.html',
  selector: 'app-test-page-layout'
})
export class TestPageLayout implements OnInit {
  @Input()
  test: Test;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.test = _items.get('test');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'établissements', url: '/schools'},
      {name: this.examination.school.name, url: `${this.examination.school.url}`},

      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`},

      {name: 'Départements', url: `${this.examination.url}/departments`},
      {name: this.examinationDepartment.department.name, url: `${this.examinationDepartment.url}`},

      {name: 'Niveaux' },
      {name: `Niveau ${this.examinationLevel.level.index + 1}`, url: `${this.examinationLevel.url}`},

      {name: 'épreuves', url: `${this.examinationLevel.url}#tests`},
      {name: `${this.test.course.name}(${this.test.course.code})`, url: `${this.test.url}`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    } else {
      this._title.setTitle(`Épreuves - ${this.test.course.name}(${this.test.course.code})`);
    }
  }

  get examination(): Examination {
    return this.examinationDepartment.examination;
  }

  get examinationDepartment(): ExaminationDepartment {
    return this.examinationLevel.examinationDepartment;
  }

  get examinationLevel(): ExaminationLevel {
    return this.test.examinationLevel;
  }
}
