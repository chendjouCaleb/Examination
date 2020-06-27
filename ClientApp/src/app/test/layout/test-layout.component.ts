import {Component, Input, OnInit} from '@angular/core';
import {Test} from 'examination/models';
import {BreadcrumbItem} from 'examination/infrastructure';
import {CurrentItems} from 'examination/app/current-items';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'test-layout.component.html',
  selector: 'app-test-layout'
})
export class TestLayoutComponent implements OnInit {
  @Input()
  test: Test;

  @Input()
  title: string;

  paths: BreadcrumbItem[] = [];

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.test = currentItems.get('test');
  }

  ngOnInit(): void {
    this.paths = [
      {name: 'épreuves', url: `${this.test.examination.url}/tests`},
      {name: this.test.name, url: `${this.test.url}/home`},
    ];

    if(this.title){
      this._title.setTitle(this.title);
      this.paths.push({name: this.title});
    }
  }
}
