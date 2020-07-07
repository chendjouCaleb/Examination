import {Component, Input, OnInit} from '@angular/core';

import {Title} from '@angular/platform-browser';
import {BreadcrumbItem} from "examination/infrastructure";
import {User} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styles: []
})
export class UserLayoutComponent implements OnInit {

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  breadCrumbItems: BreadcrumbItem[] = [];

  @Input()
  title: string;

  @Input()
  user: User = new User();

  constructor(currentItems: CurrentItems, private _title: Title) {
    this.user = currentItems.get('user');
  }


  ngOnInit(): void {
    this.breadCrumbItems = [
      {name: this.user.fullName, url: `users/${this.user.id}/home`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    }
  }
}
