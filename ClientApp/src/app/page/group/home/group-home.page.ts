import {Component} from '@angular/core';
import {Group} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'group-home.page.html',
  selector: 'app-group-home'
})
export class GroupHomePage {
  group: Group;

  constructor(currentItems: CurrentItems) {
    this.group = currentItems.get('group');
  }
}
