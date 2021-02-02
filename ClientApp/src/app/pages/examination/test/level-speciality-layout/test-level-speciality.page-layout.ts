import {Component, Input, OnInit} from '@angular/core';
import {
  Examination,
  ExaminationDepartment,
  ExaminationLevel,
  ExaminationSpeciality,
  Test,
  TestLevelSpeciality
} from 'examination/entities';
import {Router} from '@angular/router';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'test-level-speciality.page-layout.html',
  selector: 'app-test-level-speciality-page-layout'
})
export class TestLevelSpecialityPageLayout implements OnInit {
  @Input()
  testLevelSpeciality: TestLevelSpeciality;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  constructor(public _router: Router, private _title: Title, private _items: CurrentItems) {
    this.testLevelSpeciality = _items.get('testLevelSpeciality');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`},

      {name: 'Départements', url: `${this.examination.url}/departments`},
      {name: this.examinationDepartment.department.name, url: `${this.examinationDepartment.url}`},

      {name: 'Niveaux' },
      {name: `Niveau ${this.examinationLevel.level.index + 1}`, url: `${this.examinationLevel.url}`},

      {name: 'épreuves', url: `${this.examinationLevel.url}#tests`},
      {name: `${this.test.course.name}(${this.test.course.code})`, url: `${this.test.url}`},

      {name: 'Spécialités'},
      {name: `${this.examinationSpeciality.speciality.name}`, url: `${this.testLevelSpeciality.url}`}
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

  get examinationSpeciality(): ExaminationSpeciality {
    return this.testLevelSpeciality.examinationLevelSpeciality?.examinationSpeciality;
  }

  get test(): Test {
    return this.testLevelSpeciality.test;
  }
}
