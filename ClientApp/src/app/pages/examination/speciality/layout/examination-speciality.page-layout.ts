import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment, ExaminationSpeciality} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'examination-speciality.page-layout.html',
  selector: 'app-examination-speciality-page-layout'
})
export class ExaminationSpecialityPageLayout implements OnInit {
  @Input()
  examinationSpeciality: ExaminationSpeciality;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.examinationSpeciality = _items.get('examinationSpeciality');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'établissements', url: '/schools'},
      {name: this.examination.school.name, url: `${this.examination.school.url}`},

      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`},

      {name: 'Départements', url: `${this.examination.url}/departments`},
      {name: this.examinationDepartment.department.name, url: `${this.examinationDepartment.url}`},

      {name: 'Spécialité', url: `${this.examinationDepartment.url}/specialities`},
      {name: `${this.examinationSpeciality.speciality.name}`, url: `${this.examinationSpeciality.url}`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    } else {
      this._title.setTitle(`${this.examination.name}-Spécialité ${this.examinationSpeciality.speciality.name}`);
    }
  }

  get examination(): Examination {
    return this.examinationSpeciality.examinationDepartment.examination;
  }

  get examinationDepartment(): ExaminationDepartment {
    return this.examinationSpeciality.examinationDepartment;
  }
}
