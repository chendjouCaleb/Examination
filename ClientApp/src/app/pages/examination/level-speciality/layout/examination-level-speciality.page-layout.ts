import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment, ExaminationLevel, ExaminationLevelSpeciality} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'examination-level-speciality.page-layout.html',
  selector: 'app-examination-level-speciality-page-layout'
})
export class ExaminationLevelSpecialityPageLayout implements OnInit {
  examinationLevelSpeciality: ExaminationLevelSpeciality;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.examinationLevelSpeciality = _items.get('examinationLevelSpeciality');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'établissements', url: '/schools'},
      {name: this.examination.school.name, url: `${this.examination.school.url}`},

      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`},

      {name: 'Départements', url: `${this.examination.url}/departments`},
      {name: this.examinationDepartment.department.name, url: `${this.examinationDepartment.url}`},

      {name: 'Niveaux', url: `${this.examinationDepartment.url}/levels`},
      {name: `Niveau ${this.examinationLevel.level.index + 1}`, url: `${this.examinationLevel.url}`},

      {name: 'Specialités'},
      {
        name: ` ${this.examinationLevelSpeciality.examinationSpeciality.name}`,
        url: `${this.examinationLevelSpeciality.url}`
      }
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
    return this.examinationLevelSpeciality.examinationLevel.examinationDepartment.examination;
  }

  get examinationDepartment(): ExaminationDepartment {
    return this.examinationLevelSpeciality.examinationLevel.examinationDepartment;
  }

  get examinationLevel(): ExaminationLevel {
    return this.examinationLevelSpeciality.examinationLevel;
  }
}
