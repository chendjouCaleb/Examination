import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment, ExaminationLevel} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'examination-level.page-layout.html',
  selector: 'app-examination-level-page-layout'
})
export class ExaminationLevelPageLayout implements OnInit {
  @Input()
  examinationLevel: ExaminationLevel;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.examinationLevel = _items.get('examinationLevel');
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
      {name: `Niveau ${this.examinationLevel.level.index + 1}`, url: `${this.examinationLevel.url}`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    } else {
      this._title.setTitle(`${this.examination.name}-Niveau ${this.examinationLevel.level.index + 1}`);
    }
  }

  get examination(): Examination {
    return this.examinationLevel.examinationDepartment.examination;
  }

  get examinationDepartment(): ExaminationDepartment {
    return this.examinationLevel.examinationDepartment;
  }
}
