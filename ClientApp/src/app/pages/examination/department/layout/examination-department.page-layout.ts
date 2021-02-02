import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'examination-department.page-layout.html',
  selector: 'app-examination-department-page-layout'
})
export class ExaminationDepartmentPageLayout implements OnInit {
  @Input()
  examinationDepartment: ExaminationDepartment;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.examinationDepartment = _items.get('examinationDepartment');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'établissements', url: '/schools'},
      {name: this.examination.school.name, url: `${this.examination.school.url}`},
      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`},
      {name: 'Départements', url: `${this.examination.url}/departments`},
      {name: this.examinationDepartment.department.name, url: `${this.examinationDepartment.url}`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    } else {
      this._title.setTitle(`${this.examinationDepartment.examination.name}-${this.examinationDepartment.department.name}`);
    }
  }

  get examination(): Examination {
    return this.examinationDepartment.examination;
  }
}
