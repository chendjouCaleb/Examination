import {Component, Input, OnInit} from '@angular/core';
import {Examination} from 'examination/models';
import {CurrentItems} from 'examination/app/current-items';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-examination-layout',
  templateUrl: './examination-layout.component.html',
  styles: []
})
export class ExaminationLayoutComponent implements OnInit {

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  breadCrumbItems: BreadcrumbItem[] = [];

  @Input()
  title: string;

  @Input()
  examination: Examination = new Examination();

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.examination = currentItems.get('examination');
  }


  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: 'Organisations', url: '/organisations'},
      {name: this.examination.organisation.name, url: `${this.examination.organisation.url}/home`},
      {name: 'Examens', url: `${this.examination.organisation.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}/home`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    }
  }
}
