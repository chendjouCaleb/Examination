import {Component, Input, OnInit} from '@angular/core';
import {Group} from 'examination/models';
import {BreadcrumbItem} from 'examination/infrastructure';
import {CurrentItems} from 'examination/app/current-items';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'group-layout.component.html',
  selector: 'app-group-layout'
})
export class GroupLayoutComponent implements OnInit {
  @Input()
  group: Group;

  @Input()
  title: string;

  paths: BreadcrumbItem[] = [];

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.group = currentItems.get('group');
  }

  ngOnInit(): void {
    this.paths = [
      {name: 'Groupes', url: `${this.group.examination.url}/groups`},
      {name: this.group.name, url: `${this.group.url}/home`},
    ];

    if(this.title){
      this._title.setTitle(this.title);
      this.paths.push({name: this.title});
    }
  }
}
